"""
Upload data from D:\\AutomationData CSV files to Django models.

File naming convention: {AppName}_{ModelName}.csv

Usage:
    python manage.py upload_from_csv
    python manage.py upload_from_csv --dir "D:\\AutomationData"
    python manage.py upload_from_csv --dry-run
"""

import csv
import json
import os

from django.core.management.base import BaseCommand, CommandError

from Event.models import (
    delegatesAddOns,
    eventDeligatePackages,
    eventFaqs,
    sponsorPackageAddOnTypes,
    sponsorPackageAddOns,
    sponsorPackageTypes,
)
from Myadmin.models import (
    AdminRole,
    AdminUser,
    SidebarModule,
    SidebarSubModule,
    footerOptions,
    homePageNavMainCategories,
    homePageNavSubCategories,
    newsCategory,
    toEmails,
)

DATA_DIR = r"D:\AutomationData"


def _read_csv(filepath: str) -> list[dict]:
    with open(filepath, newline="", encoding="utf-8-sig") as f:
        return [row for row in csv.DictReader(f) if any(v.strip() for v in row.values())]


def _str(val: str, fallback: str = "") -> str:
    v = (val or "").strip()
    return fallback if v.upper() == "NULL" or v == "" else v


def _bool(val: str) -> bool:
    return str(val).strip().lower() in ("true", "1", "yes")


class Command(BaseCommand):
    help = "Upload all CSV files from AutomationData folder to Django models in dependency order"

    def add_arguments(self, parser):
        parser.add_argument(
            "--dir",
            default=DATA_DIR,
            help=f"Directory containing CSV files (default: {DATA_DIR})",
        )
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Preview without writing to DB",
        )

    def handle(self, *args, **options):
        data_dir = options["dir"]
        dry_run = options["dry_run"]

        if not os.path.isdir(data_dir):
            raise CommandError(f"Directory not found: {data_dir}")

        if dry_run:
            self.stdout.write(self.style.WARNING("\n[DRY RUN] No DB writes.\n"))

        # Shared id maps for FK resolution  {csv_id_str: model_instance}
        ctx = {
            "sidebar_module_map": {},
            "sidebar_submodule_map": {},
            "admin_role_map": {},
            "nav_main_map": {},
        }

        # Ordered list — respects FK dependencies
        steps = [
            ("Myadmin_sidebarmodule.csv",            self._upload_sidebar_modules),
            ("Myadmin_sidebarsubmodule.csv",          self._upload_sidebar_submodules),
            ("Myadmin_adminrole.csv",                 self._upload_admin_roles),
            ("Myadmin_adminrole_permissions.csv",     self._upload_adminrole_permissions),
            ("Myadmin_homepagenavmaincategories.csv", self._upload_nav_main),
            ("Myadmin_homepagenavsubcategories.csv",  self._upload_nav_sub),
            ("Myadmin_adminuser.csv",                 self._upload_admin_users),
            ("Myadmin_adminuser_permissions.csv",     self._upload_adminuser_permissions),
            ("Event_eventfaqs.csv",                   self._upload_event_faqs),
            ("Myadmin_toemails.csv",                  self._upload_to_emails),
            ("Myadmin_newscategory.csv",              self._upload_news_category),
            ("Myadmin_footeroptions.csv",             self._upload_footer_options),
            ("Event_sponsorpackagetypes.csv",         self._upload_sponsor_package_types),
            ("Event_eventdeligatepackages.csv",       self._upload_delegate_packages),
            ("Event_delegatesaddons.csv",             self._upload_delegate_addons),
            # sponsorPackageAddOnTypes must come before sponsorPackageAddOns (FK)
            ("Event_sponsorpackageaddontypes.csv",    self._upload_sponsor_addon_types),
            ("Event_sponsorpackageaddons.csv",        self._upload_sponsor_addons),
        ]

        for filename, handler in steps:
            filepath = os.path.join(data_dir, filename)
            if not os.path.isfile(filepath):
                self.stdout.write(self.style.WARNING(f"\n[skip] {filename} not found"))
                continue
            handler(filepath, ctx, dry_run)

        self.stdout.write(self.style.SUCCESS("\nAll done.\n"))

    # ── SidebarModule ──────────────────────────────────────────────────────────

    def _upload_sidebar_modules(self, filepath, ctx, dry_run):
        self.stdout.write("\n--- SidebarModule ---")
        rows = _read_csv(filepath)
        created = updated = 0

        for row in rows:
            csv_id = row["id"].strip()
            name    = _str(row.get("name", ""))
            icon    = _str(row.get("icon", ""))    or None
            order   = int(_str(row.get("order", "0")) or 0)
            is_del  = _str(row.get("isDelete", "No"), "No")
            id_attr = _str(row.get("id_attr", "")) or None
            link    = _str(row.get("link", ""))    or None

            self.stdout.write(f"  {name}  (csv_id={csv_id})")

            if dry_run:
                continue

            obj, was_created = SidebarModule.objects.get_or_create(
                name=name,
                defaults={"icon": icon, "order": order, "isDelete": is_del,
                          "id_attr": id_attr, "link": link},
            )
            if not was_created:
                obj.icon = icon; obj.order = order; obj.isDelete = is_del
                obj.id_attr = id_attr; obj.link = link
                obj.save()
                self.stdout.write(self.style.WARNING("    [updated]"))
                updated += 1
            else:
                self.stdout.write(self.style.SUCCESS("    [created]"))
                created += 1

            ctx["sidebar_module_map"][csv_id] = obj

        if not dry_run:
            self.stdout.write(self.style.SUCCESS(
                f"SidebarModule: {created} created, {updated} updated."
            ))

    # ── SidebarSubModule ───────────────────────────────────────────────────────

    def _upload_sidebar_submodules(self, filepath, ctx, dry_run):
        self.stdout.write("\n--- SidebarSubModule ---")
        rows = _read_csv(filepath)
        created = updated = skipped = 0

        for row in rows:
            csv_id    = row["id"].strip()
            name      = _str(row.get("name", ""))
            link      = _str(row.get("link", ""))
            id_attr   = _str(row.get("id_attr", ""))
            order     = int(_str(row.get("order", "0")) or 0)
            is_del    = _str(row.get("isDelete", "No"), "No")
            module_csv_id = _str(row.get("module_id", ""))

            parent = ctx["sidebar_module_map"].get(module_csv_id)
            if parent is None and not dry_run:
                try:
                    parent = SidebarModule.objects.get(pk=int(module_csv_id))
                except (SidebarModule.DoesNotExist, ValueError):
                    self.stdout.write(self.style.WARNING(
                        f"  [skip] {name}: parent module_id={module_csv_id} not found"
                    ))
                    skipped += 1
                    continue

            self.stdout.write(f"  {name}  module_id={module_csv_id}")

            if dry_run:
                continue

            obj, was_created = SidebarSubModule.objects.get_or_create(
                name=name,
                module=parent,
                defaults={"link": link, "id_attr": id_attr, "order": order, "isDelete": is_del},
            )
            if not was_created:
                obj.link = link; obj.id_attr = id_attr
                obj.order = order; obj.isDelete = is_del
                obj.save()
                self.stdout.write(self.style.WARNING("    [updated]"))
                updated += 1
            else:
                self.stdout.write(self.style.SUCCESS("    [created]"))
                created += 1

            ctx["sidebar_submodule_map"][csv_id] = obj

        if not dry_run:
            self.stdout.write(self.style.SUCCESS(
                f"SidebarSubModule: {created} created, {updated} updated, {skipped} skipped."
            ))

    # ── AdminRole ──────────────────────────────────────────────────────────────

    def _upload_admin_roles(self, filepath, ctx, dry_run):
        self.stdout.write("\n--- AdminRole ---")
        rows = _read_csv(filepath)
        created = updated = 0

        for row in rows:
            csv_id   = row["id"].strip()
            name     = _str(row.get("name", ""))
            is_del   = _str(row.get("isDelete", "No"), "No")
            raw_perms = _str(row.get("detailed_permissions", "{}"))
            try:
                detail_perms = json.loads(raw_perms) if raw_perms else {}
            except json.JSONDecodeError:
                detail_perms = {}

            self.stdout.write(f"  {name}  (csv_id={csv_id})")

            if dry_run:
                continue

            obj, was_created = AdminRole.objects.get_or_create(
                name=name,
                defaults={"detailed_permissions": detail_perms, "isDelete": is_del},
            )
            if not was_created:
                obj.detailed_permissions = detail_perms
                obj.isDelete = is_del
                obj.save()
                self.stdout.write(self.style.WARNING("    [updated]"))
                updated += 1
            else:
                self.stdout.write(self.style.SUCCESS("    [created]"))
                created += 1

            ctx["admin_role_map"][csv_id] = obj

        if not dry_run:
            self.stdout.write(self.style.SUCCESS(
                f"AdminRole: {created} created, {updated} updated."
            ))

    # ── AdminRole permissions M2M ──────────────────────────────────────────────

    def _upload_adminrole_permissions(self, filepath, ctx, dry_run):
        self.stdout.write("\n--- AdminRole.permissions (M2M) ---")
        rows = _read_csv(filepath)
        added = skipped = 0

        for row in rows:
            role_csv_id = _str(row.get("adminrole_id", ""))
            sub_csv_id  = _str(row.get("sidebarsubmodule_id", ""))

            role_obj = ctx["admin_role_map"].get(role_csv_id)
            sub_obj  = ctx["sidebar_submodule_map"].get(sub_csv_id)

            if role_obj is None and not dry_run:
                try:
                    role_obj = AdminRole.objects.get(pk=int(role_csv_id))
                except (AdminRole.DoesNotExist, ValueError):
                    self.stdout.write(self.style.WARNING(
                        f"  [skip] role_id={role_csv_id} not found"
                    ))
                    skipped += 1
                    continue

            if sub_obj is None and not dry_run:
                try:
                    sub_obj = SidebarSubModule.objects.get(pk=int(sub_csv_id))
                except (SidebarSubModule.DoesNotExist, ValueError):
                    self.stdout.write(self.style.WARNING(
                        f"  [skip] submodule_id={sub_csv_id} not found"
                    ))
                    skipped += 1
                    continue

            self.stdout.write(f"  role={role_csv_id} -> submodule={sub_csv_id}")

            if dry_run:
                continue

            role_obj.permissions.add(sub_obj)
            added += 1

        if not dry_run:
            self.stdout.write(self.style.SUCCESS(
                f"AdminRole M2M: {added} added, {skipped} skipped."
            ))

    # ── homePageNavMainCategories ──────────────────────────────────────────────

    def _upload_nav_main(self, filepath, ctx, dry_run):
        self.stdout.write("\n--- homePageNavMainCategories ---")
        rows = _read_csv(filepath)
        created = updated = 0

        for row in rows:
            csv_id     = row["id"].strip()
            name       = _str(row.get("navMainCategoryName", ""))
            path       = _str(row.get("navMainCategoryPath", ""))
            created_by = _str(row.get("created_by", ""), "Admin")
            updated_by = _str(row.get("updated_by", ""), "Admin")
            is_del     = _str(row.get("isDelete", "No"), "No")
            is_checked = _str(row.get("isChecked", "No"), "No")

            self.stdout.write(f"  {name}  ({path})")

            if dry_run:
                continue

            obj, was_created = homePageNavMainCategories.objects.get_or_create(
                navMainCategoryName=name,
                defaults={"navMainCategoryPath": path, "isChecked": is_checked,
                          "created_by": created_by, "updated_by": updated_by,
                          "isDelete": is_del},
            )
            if not was_created:
                obj.navMainCategoryPath = path; obj.isChecked = is_checked
                obj.isDelete = is_del; obj.updated_by = updated_by
                obj.save()
                self.stdout.write(self.style.WARNING("    [updated]"))
                updated += 1
            else:
                self.stdout.write(self.style.SUCCESS("    [created]"))
                created += 1

            ctx["nav_main_map"][csv_id] = obj

        if not dry_run:
            self.stdout.write(self.style.SUCCESS(
                f"NavMain: {created} created, {updated} updated."
            ))

    # ── homePageNavSubCategories ───────────────────────────────────────────────

    def _upload_nav_sub(self, filepath, ctx, dry_run):
        self.stdout.write("\n--- homePageNavSubCategories ---")
        rows = _read_csv(filepath)
        created = updated = skipped = 0

        for row in rows:
            name       = _str(row.get("navSubCategoryName", ""))
            path       = _str(row.get("navSubCategoryPath", ""))
            created_by = _str(row.get("created_by", ""), "Admin")
            updated_by = _str(row.get("updated_by", ""), "Admin")
            is_del     = _str(row.get("isDelete", "No"), "No")
            is_checked = _str(row.get("isChecked", "No"), "No")
            # CSV column is navMainCategoryId_id (Django appends _id to FK fields on export)
            main_csv_id = _str(
                row.get("navMainCategoryId_id") or row.get("navMainCategoryId", "")
            )

            parent = ctx["nav_main_map"].get(main_csv_id)
            if parent is None and not dry_run:
                try:
                    parent = homePageNavMainCategories.objects.get(pk=int(main_csv_id))
                except (homePageNavMainCategories.DoesNotExist, ValueError):
                    self.stdout.write(self.style.WARNING(
                        f"  [skip] {name}: parent main_id={main_csv_id} not found"
                    ))
                    skipped += 1
                    continue

            self.stdout.write(f"  {name}  ({path})  parent={main_csv_id}")

            if dry_run:
                continue

            obj, was_created = homePageNavSubCategories.objects.get_or_create(
                navSubCategoryName=name,
                navMainCategoryId=parent,
                defaults={"navSubCategoryPath": path, "isChecked": is_checked,
                          "created_by": created_by, "updated_by": updated_by,
                          "isDelete": is_del},
            )
            if not was_created:
                obj.navSubCategoryPath = path; obj.isChecked = is_checked
                obj.isDelete = is_del; obj.updated_by = updated_by
                obj.save()
                self.stdout.write(self.style.WARNING("    [updated]"))
                updated += 1
            else:
                self.stdout.write(self.style.SUCCESS("    [created]"))
                created += 1

        if not dry_run:
            self.stdout.write(self.style.SUCCESS(
                f"NavSub: {created} created, {updated} updated, {skipped} skipped."
            ))

    # ── AdminUser ──────────────────────────────────────────────────────────────

    def _upload_admin_users(self, filepath, ctx, dry_run):
        self.stdout.write("\n--- AdminUser ---")
        rows = _read_csv(filepath)
        created = updated = skipped = 0

        for row in rows:
            csv_id       = row["id"].strip()
            name         = _str(row.get("name", ""))
            username     = _str(row.get("username", ""))
            email        = _str(row.get("email", ""))
            password     = _str(row.get("password", ""))  # already hashed
            is_active    = _bool(row.get("is_active", "True"))
            is_del       = _str(row.get("isDelete", "No"), "No")
            role_csv_id  = _str(row.get("role_id", ""))
            raw_perms    = _str(row.get("detailed_permissions", "{}"))
            try:
                detail_perms = json.loads(raw_perms) if raw_perms else {}
            except json.JSONDecodeError:
                detail_perms = {}

            role_obj = ctx["admin_role_map"].get(role_csv_id) if role_csv_id else None
            if role_obj is None and role_csv_id and not dry_run:
                try:
                    role_obj = AdminRole.objects.get(pk=int(role_csv_id))
                except (AdminRole.DoesNotExist, ValueError):
                    self.stdout.write(self.style.WARNING(
                        f"  [warn] {username}: role_id={role_csv_id} not found, setting NULL"
                    ))

            self.stdout.write(f"  {username}  ({email})")

            if dry_run:
                continue

            try:
                obj = AdminUser.objects.get(email=email)
                # Update fields — do NOT re-hash the already-hashed password
                obj.name = name; obj.username = username
                obj.password = password
                obj.detailed_permissions = detail_perms
                obj.is_active = is_active; obj.isDelete = is_del
                obj.role = role_obj
                obj.save()
                self.stdout.write(self.style.WARNING("    [updated]"))
                updated += 1
            except AdminUser.DoesNotExist:
                # Create directly (bypass manager's create_user to avoid re-hashing)
                obj = AdminUser(
                    name=name, username=username, email=email,
                    password=password,
                    detailed_permissions=detail_perms,
                    is_active=is_active, isDelete=is_del, role=role_obj,
                )
                obj.save()
                self.stdout.write(self.style.SUCCESS("    [created]"))
                created += 1

            ctx[f"admin_user_map_{csv_id}"] = obj

        if not dry_run:
            self.stdout.write(self.style.SUCCESS(
                f"AdminUser: {created} created, {updated} updated, {skipped} skipped."
            ))

    # ── AdminUser permissions M2M ──────────────────────────────────────────────

    def _upload_adminuser_permissions(self, filepath, ctx, dry_run):
        self.stdout.write("\n--- AdminUser.permissions (M2M) ---")
        rows = _read_csv(filepath)
        added = skipped = 0

        # Build a reverse lookup: csv_id → AdminUser (from previously stored keys)
        user_map = {
            k.replace("admin_user_map_", ""): v
            for k, v in ctx.items()
            if k.startswith("admin_user_map_")
        }

        for row in rows:
            user_csv_id = _str(row.get("adminuser_id", ""))
            sub_csv_id  = _str(row.get("sidebarsubmodule_id", ""))

            user_obj = user_map.get(user_csv_id)
            sub_obj  = ctx["sidebar_submodule_map"].get(sub_csv_id)

            if user_obj is None and not dry_run:
                try:
                    user_obj = AdminUser.objects.get(pk=int(user_csv_id))
                except (AdminUser.DoesNotExist, ValueError):
                    self.stdout.write(self.style.WARNING(
                        f"  [skip] user_id={user_csv_id} not found"
                    ))
                    skipped += 1
                    continue

            if sub_obj is None and not dry_run:
                try:
                    sub_obj = SidebarSubModule.objects.get(pk=int(sub_csv_id))
                except (SidebarSubModule.DoesNotExist, ValueError):
                    self.stdout.write(self.style.WARNING(
                        f"  [skip] submodule_id={sub_csv_id} not found"
                    ))
                    skipped += 1
                    continue

            self.stdout.write(f"  user={user_csv_id} -> submodule={sub_csv_id}")

            if dry_run:
                continue

            user_obj.permissions.add(sub_obj)
            added += 1

        if not dry_run:
            self.stdout.write(self.style.SUCCESS(
                f"AdminUser M2M: {added} added, {skipped} skipped."
            ))

    # ── eventFaqs ─────────────────────────────────────────────────────────────

    def _upload_event_faqs(self, filepath, ctx, dry_run):
        self.stdout.write("\n--- eventFaqs ---")
        rows = _read_csv(filepath)
        created = updated = 0

        for row in rows:
            question   = _str(row.get("faqQuestion", ""))
            answer     = _str(row.get("faqAnswer", ""))
            created_by = _str(row.get("created_by", ""), "Admin")
            updated_by = _str(row.get("updated_by", ""), "Admin")
            is_del     = _str(row.get("isDelete", "No"), "No")

            if not question:
                continue

            self.stdout.write(f"  {question[:60]}...")

            if dry_run:
                continue

            obj, was_created = eventFaqs.objects.get_or_create(
                faqQuestion=question,
                defaults={"faqAnswer": answer, "created_by": created_by,
                          "updated_by": updated_by, "isDelete": is_del},
            )
            if not was_created:
                obj.faqAnswer = answer
                obj.isDelete = is_del
                obj.updated_by = updated_by
                obj.save()
                self.stdout.write(self.style.WARNING("    [updated]"))
                updated += 1
            else:
                self.stdout.write(self.style.SUCCESS("    [created]"))
                created += 1

        if not dry_run:
            self.stdout.write(self.style.SUCCESS(
                f"eventFaqs: {created} created, {updated} updated."
            ))

    # ── toEmails ──────────────────────────────────────────────────────────────

    def _upload_to_emails(self, filepath, ctx, dry_run):
        self.stdout.write("\n--- toEmails ---")
        rows = _read_csv(filepath)
        created = updated = 0

        for row in rows:
            email  = _str(row.get("toemails", ""))
            is_del = _str(row.get("isDelete", "No"), "No")
            if not email:
                continue
            self.stdout.write(f"  {email}")
            if dry_run:
                continue
            obj, was_created = toEmails.objects.get_or_create(
                toemails=email,
                defaults={"isDelete": is_del, "created_by": "Admin", "updated_by": "Admin"},
            )
            if not was_created:
                obj.isDelete = is_del
                obj.updated_by = "Admin"
                obj.save()
                self.stdout.write(self.style.WARNING("    [updated]"))
                updated += 1
            else:
                self.stdout.write(self.style.SUCCESS("    [created]"))
                created += 1

        if not dry_run:
            self.stdout.write(self.style.SUCCESS(f"toEmails: {created} created, {updated} updated."))

    # ── newsCategory ──────────────────────────────────────────────────────────

    def _upload_news_category(self, filepath, ctx, dry_run):
        self.stdout.write("\n--- newsCategory ---")
        rows = _read_csv(filepath)
        created = updated = 0

        for row in rows:
            name   = _str(row.get("categoryName", ""))
            is_del = _str(row.get("isDelete", "No"), "No")
            if not name:
                continue
            self.stdout.write(f"  {name}")
            if dry_run:
                continue
            obj, was_created = newsCategory.objects.get_or_create(
                categoryName=name,
                defaults={"isDelete": is_del, "created_by": "Admin", "updated_by": "Admin"},
            )
            if not was_created:
                obj.isDelete = is_del
                obj.updated_by = "Admin"
                obj.save()
                self.stdout.write(self.style.WARNING("    [updated]"))
                updated += 1
            else:
                self.stdout.write(self.style.SUCCESS("    [created]"))
                created += 1

        if not dry_run:
            self.stdout.write(self.style.SUCCESS(f"newsCategory: {created} created, {updated} updated."))

    # ── footerOptions ─────────────────────────────────────────────────────────

    def _upload_footer_options(self, filepath, ctx, dry_run):
        self.stdout.write("\n--- footerOptions ---")
        rows = _read_csv(filepath)
        created = updated = 0

        for row in rows:
            name       = _str(row.get("footerOptionsName", ""))
            path       = _str(row.get("footerOptionsPath", ""))
            is_checked = _str(row.get("isChecked", "No"), "No")
            is_del     = _str(row.get("isDelete", "No"), "No")
            if not name:
                continue
            self.stdout.write(f"  {name}  ->  {path}")
            if dry_run:
                continue
            obj, was_created = footerOptions.objects.get_or_create(
                footerOptionsName=name,
                defaults={"footerOptionsPath": path, "isChecked": is_checked,
                          "isDelete": is_del, "created_by": "Admin", "updated_by": "Admin"},
            )
            if not was_created:
                obj.footerOptionsPath = path
                obj.isChecked = is_checked
                obj.isDelete = is_del
                obj.updated_by = "Admin"
                obj.save()
                self.stdout.write(self.style.WARNING("    [updated]"))
                updated += 1
            else:
                self.stdout.write(self.style.SUCCESS("    [created]"))
                created += 1

        if not dry_run:
            self.stdout.write(self.style.SUCCESS(f"footerOptions: {created} created, {updated} updated."))

    # ── sponsorPackageTypes ───────────────────────────────────────────────────

    def _upload_sponsor_package_types(self, filepath, ctx, dry_run):
        self.stdout.write("\n--- sponsorPackageTypes ---")
        rows = _read_csv(filepath)
        created = updated = 0

        for row in rows:
            pkg_type  = _str(row.get("sponsorPackageType", ""))
            is_del    = _str(row.get("isDelete", "No"), "No")
            if not pkg_type:
                continue
            defaults = {
                "sponsorPackagePrice":        _str(row.get("sponsorPackagePrice", "")),
                "sponsorPackageCuttingPrice": _str(row.get("sponsorPackageCuttingPrice", "")),
                "delegatePassQty":            _str(row.get("delegatePassQty", "")),
                "inviteDiscount":             _str(row.get("inviteDiscount", "")),
                "exhibitSpace":               _str(row.get("exhibitSpace", "")),
                "sponsorPackageShowOrder":    _str(row.get("sponsorPackageShowOrder", "")),
                "isDelete": is_del, "created_by": "Admin", "updated_by": "Admin",
            }
            self.stdout.write(f"  {pkg_type}")
            if dry_run:
                continue
            obj, was_created = sponsorPackageTypes.objects.get_or_create(
                sponsorPackageType=pkg_type, defaults=defaults,
            )
            if not was_created:
                for k, v in defaults.items():
                    if k != "created_by":
                        setattr(obj, k, v)
                obj.updated_by = "Admin"
                obj.save()
                self.stdout.write(self.style.WARNING("    [updated]"))
                updated += 1
            else:
                self.stdout.write(self.style.SUCCESS("    [created]"))
                created += 1

        if not dry_run:
            self.stdout.write(self.style.SUCCESS(f"sponsorPackageTypes: {created} created, {updated} updated."))

    # ── eventDeligatePackages ─────────────────────────────────────────────────

    def _upload_delegate_packages(self, filepath, ctx, dry_run):
        self.stdout.write("\n--- eventDeligatePackages ---")
        rows = _read_csv(filepath)
        created = updated = 0

        for row in rows:
            name     = _str(row.get("deligatePackageName", ""))
            is_del   = _str(row.get("isDelete", "No"), "No")
            exp_raw  = _str(row.get("deligatePackageExpiryDate", ""))
            if not name:
                continue
            import datetime
            expiry = None
            if exp_raw:
                for fmt in ("%Y-%m-%d", "%d/%m/%Y", "%d-%m-%Y"):
                    try:
                        expiry = datetime.datetime.strptime(exp_raw, fmt).date()
                        break
                    except ValueError:
                        pass
            defaults = {
                "deligatePackagePrice":       _str(row.get("deligatePackagePrice", "")),
                "deligatePackageStatus":      _str(row.get("deligatePackageStatus", "")),
                "deligatePackageShowOrder":   _str(row.get("deligatePackageShowOrder", "")),
                "deligatePackageExpiryDate":  expiry,
                "isDelete": is_del, "created_by": "Admin", "updated_by": "Admin",
            }
            self.stdout.write(f"  {name}")
            if dry_run:
                continue
            obj, was_created = eventDeligatePackages.objects.get_or_create(
                deligatePackageName=name, defaults=defaults,
            )
            if not was_created:
                for k, v in defaults.items():
                    if k != "created_by":
                        setattr(obj, k, v)
                obj.updated_by = "Admin"
                obj.save()
                self.stdout.write(self.style.WARNING("    [updated]"))
                updated += 1
            else:
                self.stdout.write(self.style.SUCCESS("    [created]"))
                created += 1

        if not dry_run:
            self.stdout.write(self.style.SUCCESS(f"eventDeligatePackages: {created} created, {updated} updated."))

    # ── delegatesAddOns ───────────────────────────────────────────────────────

    def _upload_delegate_addons(self, filepath, ctx, dry_run):
        self.stdout.write("\n--- delegatesAddOns ---")
        rows = _read_csv(filepath)
        created = updated = 0

        for row in rows:
            name   = _str(row.get("addOnPointName", ""))
            price  = _str(row.get("additionalPrice", ""))
            is_del = _str(row.get("isDelete", "No"), "No")
            if not name:
                continue
            self.stdout.write(f"  {name}")
            if dry_run:
                continue
            obj, was_created = delegatesAddOns.objects.get_or_create(
                addOnPointName=name,
                defaults={"additionalPrice": price, "isDelete": is_del,
                          "created_by": "Admin", "updated_by": "Admin"},
            )
            if not was_created:
                obj.additionalPrice = price
                obj.isDelete = is_del
                obj.updated_by = "Admin"
                obj.save()
                self.stdout.write(self.style.WARNING("    [updated]"))
                updated += 1
            else:
                self.stdout.write(self.style.SUCCESS("    [created]"))
                created += 1

        if not dry_run:
            self.stdout.write(self.style.SUCCESS(f"delegatesAddOns: {created} created, {updated} updated."))

    # ── sponsorPackageAddOnTypes ──────────────────────────────────────────────

    def _upload_sponsor_addon_types(self, filepath, ctx, dry_run):
        self.stdout.write("\n--- sponsorPackageAddOnTypes ---")
        rows = _read_csv(filepath)
        created = updated = 0

        for row in rows:
            csv_id = row.get("id", "").strip()
            name   = _str(row.get("addOnTypeName", ""))
            is_del = _str(row.get("isDelete", "No"), "No")
            if not name:
                continue
            self.stdout.write(f"  {name}  (csv_id={csv_id})")
            if dry_run:
                continue
            obj, was_created = sponsorPackageAddOnTypes.objects.get_or_create(
                addOnTypeName=name,
                defaults={"isDelete": is_del, "created_by": "Admin", "updated_by": "Admin"},
            )
            if not was_created:
                obj.isDelete = is_del
                obj.updated_by = "Admin"
                obj.save()
                self.stdout.write(self.style.WARNING("    [updated]"))
                updated += 1
            else:
                self.stdout.write(self.style.SUCCESS("    [created]"))
                created += 1

            if csv_id:
                ctx.setdefault("sponsor_addon_type_map", {})[csv_id] = obj

        if not dry_run:
            self.stdout.write(self.style.SUCCESS(f"sponsorPackageAddOnTypes: {created} created, {updated} updated."))

    # ── sponsorPackageAddOns (FK -> sponsorPackageAddOnTypes) ─────────────────

    def _upload_sponsor_addons(self, filepath, ctx, dry_run):
        self.stdout.write("\n--- sponsorPackageAddOns ---")
        rows = _read_csv(filepath)
        created = updated = skipped = 0
        addon_type_map = ctx.get("sponsor_addon_type_map", {})

        for row in rows:
            name         = _str(row.get("sponsorAddOnName", ""))
            price        = _str(row.get("sponsorAddOnPrice", ""))
            is_del       = _str(row.get("isDelete", "No"), "No")
            # Django CSV exports FK fields as fieldName_id
            type_csv_id  = _str(
                row.get("sponsorPackageAddOnTypeId_id") or row.get("sponsorPackageAddOnTypeId", "")
            )
            if not name:
                continue

            type_obj = addon_type_map.get(type_csv_id)
            if type_obj is None and not dry_run:
                try:
                    type_obj = sponsorPackageAddOnTypes.objects.get(pk=int(type_csv_id))
                except (sponsorPackageAddOnTypes.DoesNotExist, ValueError):
                    self.stdout.write(self.style.WARNING(
                        f"  [skip] {name}: sponsorPackageAddOnTypeId={type_csv_id} not found"
                    ))
                    skipped += 1
                    continue

            self.stdout.write(f"  {name}  (type_id={type_csv_id})")
            if dry_run:
                continue

            obj, was_created = sponsorPackageAddOns.objects.get_or_create(
                sponsorAddOnName=name,
                defaults={"sponsorPackageAddOnTypeId": type_obj, "sponsorAddOnPrice": price,
                          "isDelete": is_del, "created_by": "Admin", "updated_by": "Admin"},
            )
            if not was_created:
                obj.sponsorPackageAddOnTypeId = type_obj
                obj.sponsorAddOnPrice = price
                obj.isDelete = is_del
                obj.updated_by = "Admin"
                obj.save()
                self.stdout.write(self.style.WARNING("    [updated]"))
                updated += 1
            else:
                self.stdout.write(self.style.SUCCESS("    [created]"))
                created += 1

        if not dry_run:
            self.stdout.write(self.style.SUCCESS(
                f"sponsorPackageAddOns: {created} created, {updated} updated, {skipped} skipped."
            ))
