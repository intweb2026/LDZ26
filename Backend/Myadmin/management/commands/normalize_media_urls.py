"""
Management command: normalize_media_urls
Strips the baked-in domain from media URLs stored in the database,
leaving only the relative path  (e.g. /media/filename.jpg).

Usage:
    python manage.py normalize_media_urls          # dry-run (preview only)
    python manage.py normalize_media_urls --apply  # actually update the DB
"""

import re
from django.core.management.base import BaseCommand
from Myadmin.models import (
    homePageVideoSectionInput,
    homePageThirdSection,
    homePageNavLogoData,
    generalNewsPoint,
    companiesLogoSection,
)
from Event.models import (
    eventDetails,
    eventSpeakers,
    eventPastAttandees,
    eventSponsors,
    relatedEvents,
    eventLeaders,
)


# ── Field map: (Model, [field names]) ─────────────────────────────────────────
FIELD_MAP = [
    (homePageVideoSectionInput, [
        "eventDetailBackImage",
        "videoLinkmp4",
        "videoLinkwebm",
        "eventStataticsBackImage",
        "eventExpertSpeakerBackImage",
    ]),
    (homePageThirdSection, [
        "thirdSectionBackgroundImage",
    ]),
    (homePageNavLogoData, [
        "blackLogoLink",
        "whiteLogoLink",
    ]),
    (generalNewsPoint, [
        "newsImage",
    ]),
    (companiesLogoSection, [
        "logoLink",
    ]),
    (eventDetails, [
        "favicon",
    ]),
    (eventSpeakers, [
        "eventSpeakerHomePageImage",
        "eventSpeakerProfilePageImage",
        "eventSpeakerFeaturedPageImage",
    ]),
    (eventPastAttandees, [
        "pastAttandeeLogo",
    ]),
    (eventSponsors, [
        "sponsorComapnyLogo",
    ]),
    (relatedEvents, [
        "logoLink",
    ]),
    (eventLeaders, [
        "leaderLogo",
    ]),
]

# Matches any http(s)://hostname prefix that comes before /media/
DOMAIN_PREFIX = re.compile(r'^https?://[^/]+(?=/media/)')


def strip_domain(value):
    """Return the relative path if value has a domain prefix, else unchanged."""
    if value and DOMAIN_PREFIX.match(value):
        return DOMAIN_PREFIX.sub('', value)
    return value


class Command(BaseCommand):
    help = "Strip domain prefix from media URL fields and store relative paths only."

    def add_arguments(self, parser):
        parser.add_argument(
            '--apply',
            action='store_true',
            help='Actually write changes to the database (default is dry-run).',
        )

    def handle(self, *args, **options):
        apply = options['apply']
        mode = "APPLY" if apply else "DRY-RUN"
        self.stdout.write(f"\n{'='*60}")
        self.stdout.write(f"  normalize_media_urls  [{mode}]")
        self.stdout.write(f"{'='*60}\n")

        total_changed = 0

        for Model, fields in FIELD_MAP:
            model_name = Model.__name__
            records = Model.objects.all()
            model_changed = 0

            for record in records:
                dirty = False
                changes = {}

                for field in fields:
                    old_val = getattr(record, field, None) or ''
                    new_val = strip_domain(old_val)
                    if new_val != old_val:
                        changes[field] = (old_val, new_val)
                        setattr(record, field, new_val)
                        dirty = True

                if dirty:
                    for field, (old, new) in changes.items():
                        self.stdout.write(
                            f"  [{model_name} id={record.id}] {field}\n"
                            f"    BEFORE: {old}\n"
                            f"    AFTER : {new}\n"
                        )
                    if apply:
                        record.save(update_fields=list(changes.keys()))
                    model_changed += 1

            status = f"{model_changed} record(s) {'updated' if apply else 'to update'}"
            self.stdout.write(self.style.SUCCESS(f"{model_name}: {status}"))
            total_changed += model_changed

        self.stdout.write(f"\n{'='*60}")
        if apply:
            self.stdout.write(self.style.SUCCESS(
                f"Done. {total_changed} record(s) updated in DB."
            ))
        else:
            self.stdout.write(self.style.WARNING(
                f"Dry-run complete. {total_changed} record(s) would be changed.\n"
                f"Run with --apply to commit changes."
            ))
        self.stdout.write(f"{'='*60}\n")
