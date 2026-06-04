from django.core.management.base import BaseCommand
from Myadmin.models import newsCategory, generalNewsPoint
import datetime


NEWS_CATEGORIES = [
    "Market Trends",
    "Partnerships",
    "Investment",
    "Regulatory",
    "Research",
    "Insights",
    "Innovation",
    "Technology",
]

NEWS_ARTICLES = [
    {
        "category": "Market Trends",
        "newsTitle": "Australia Stopped Waiting for Cars to Save Its Lithium",
        "newsShortDescription": "Australia is now the world's third-largest BESS market, and lithium demand is better for it",
        "newsDescription": (
            "<p>For a country that digs up more lithium than almost anywhere else, Australia has long been hostage to a single customer: "
            "the electric vehicle. That dependence cost it dearly when EV demand softened and spodumene prices collapsed from their 2022 peaks. "
            "The solution, it turns out, may have been sitting in Australia's own backyard.</p>"
            "<p>In 2025, Australia overtook Britain to become the third-largest market for utility-scale battery energy storage systems (BESS), "
            "behind only China and the United States. It now holds more such capacity per head than any other nation, according to Rystad Energy. "
            "The numbers are striking. Over AUD 2.4 billion was committed to large-scale battery projects in the first quarter of 2025 alone, "
            "the second-highest quarterly total on record, per the Clean Energy Council. The national development pipeline expanded from 109 "
            "gigawatts in mid-2024 to 154 gigawatts a year later. In August 2025, Akaysha Energy commissioned the first stage of the Waratah "
            "Super Battery in New South Wales, an 850-megawatt facility described as the largest of its kind in the world.</p>"
            "<p>The knock-on effects for lithium have been considerable. BESS demand rose roughly 75% year-on-year in 2025 and is now on course "
            "to represent around a fifth of total global battery demand, according to analysts at Argonaut. Combined with supply discipline from "
            "producers who had shuttered costly capacity during the downturn, this helped drive spodumene concentrate prices from below $600 per "
            "tonne in mid-2025 to above $2,000 per tonne by early 2026. Globally, BESS installations topped 300 gigawatt-hours last year, a 51% "
            "increase, according to Benchmark Mineral Intelligence.</p>"
            "<p>The structural case is persuasive. Grid operators and utilities are treating battery storage as core infrastructure rather than a "
            "supplementary service, broadening the lithium demand base in ways that were not foreseeable even five years ago. Australia's miners "
            "now face something unfamiliar: a second, domestically anchored source of demand growing independently of car sales in Shenzhen or Stuttgart.</p>"
            "<p>Whether it holds is another matter. Supply tends to follow price, and a sustained rally above $2,000 per tonne will tempt "
            "mothballed producers back into the market. The lithium sector has been here before, mistaking a cyclical reprieve for a structural cure.</p>"
        ),
        "newsPageUrl": "australia-stopped-waiting-for-cars-to-save-its-lithium",
        "newsCreatedDate": datetime.date(2025, 11, 4),
        "newsMetaTitle": "Australia Stopped Waiting for Cars to Save Its Lithium",
        "newsMetaDescription": "Australia is now the world's third-largest BESS market, and lithium demand is better for it",
        "isTopNews": "No",
    },
    {
        "category": "Partnerships",
        "newsTitle": "Korea Shops Down Under for Its Battery Future",
        "newsShortDescription": "MinRes and POSCO's $765M joint venture across two WA lithium mines marks the first major Korean equity stake in Australian hard-rock lithium",
        "newsDescription": (
            "<p>Mineral Resources and POSCO Holdings have signed a binding joint venture agreement covering the Wodgina and Mt Marion "
            "hard-rock lithium mines in Western Australia, with the South Korean conglomerate paying US$765 million for a 30 percent stake "
            "in the new entity. Mineral Resources retains a 70 percent majority and continues as operator of both sites.</p>"
            "<p>The deal grants POSCO proportional access to spodumene concentrate, the raw feedstock for battery-grade lithium chemicals, "
            "feeding its processing operations in Korea and elsewhere. Mineral Resources chair Malcolm Bundey called it the first major "
            "Korean company investment into Australian hard-rock lithium, describing it as a milestone in bilateral critical minerals cooperation.</p>"
            "<p>The implied valuation of Mineral Resources' combined 50 percent ownership across both mines stands at roughly US$3.9 billion, "
            "a signal of institutional confidence in Australian spodumene assets despite weak near-term prices.</p>"
            "<p>For Mineral Resources, the proceeds are earmarked for debt reduction. Net debt is projected to fall from approximately A$5.4 "
            "billion to around A$3.7 billion by end of 2026, restoring financial headroom at a time when the company has faced significant "
            "balance sheet pressure.</p>"
            "<p>POSCO Holdings' rationale is as strategic as much as financial. The transaction extends a raw material security programme spanning "
            "hard-rock assets in Australia and brine operations in South America, reducing reliance on spot market purchases. POSCO Holdings chief "
            "executive In Hwa Chang described the partnership as combining both companies' capabilities to drive sustainable growth in the energy "
            "materials industry, a business line the group has positioned alongside its core steel operations as a primary growth driver.</p>"
            "<p>The joint venture builds on an existing relationship between the two companies through the Onslow Iron project in Western Australia.</p>"
            "<p>Completion is subject to final documentation and Foreign Investment Review Board approval, with closing expected in the first half "
            "of 2026. Whether the structure becomes a template for other allied-nation equity arrangements in Australia's critical minerals sector "
            "will depend in part on how the regulatory and pricing environment evolves over that period.</p>"
        ),
        "newsPageUrl": "korea-shops-down-under-for-its-battery-future",
        "newsCreatedDate": datetime.date(2025, 11, 14),
        "newsMetaTitle": "Korea Shops Down Under for Its Battery Future",
        "newsMetaDescription": "MinRes and POSCO's $765M joint venture across two WA lithium mines marks the first major Korean equity stake in Australian hard-rock lithium",
        "isTopNews": "No",
    },
    {
        "category": "Investment",
        "newsTitle": "Lithium, Gallium, and a Very Expensive Friendship",
        "newsShortDescription": "A US-Australia framework commits $3 billion in near-term joint financing across an $8.5 billion critical minerals project pipeline",
        "newsDescription": (
            "<p>When the US and Australia signed a bilateral investment framework at the White House last October, it marked something "
            "genuinely new: a formal, institutionally backed partnership to develop critical minerals together, with real money attached. "
            "The deal commits at least $3 billion in near-term joint financing across a project pipeline valued at up to $8.5 billion, "
            "covering everything from project selection to permitting to capital deployment through loans, equity stakes, and offtake-backed financing.</p>"
            "<p>The financial architecture is substantial. The US Export-Import Bank issued seven letters of interest totalling more than $22 billion, "
            "expected to catalyze up to $5 billion in total investment across qualifying Australian projects. Early named transactions include a "
            "$200 million US equity stake in Alcoa's high-purity gallium refinery in Western Australia and a $100 million commitment to "
            "Arafura's Nolans rare earths project in the Northern Territory. Both governments pledged at least $1 billion each within six months "
            "of signing, with recoverable resources across the identified pipeline estimated at up to $53 billion.</p>"
            "<p>The strategic rationale is not subtle. Australia holds 680 resource deposits aligned with the US critical minerals list, and the "
            "framework is designed to accelerate those assets into production while reducing dependence on Chinese-controlled processing. "
            "A bilateral Critical Minerals Supply Security Response Group, co-led by the US Secretary of Energy and Australia's Minister for "
            "Resources, has been established to identify vulnerabilities and coordinate delivery. Both governments have also committed to "
            "streamlining permitting timelines, targeting a structural bottleneck that has stalled project bankability for years.</p>"
            "<p>At the domestic level, the same capital logic applies. Australia's National Reconstruction Fund committed AU$50 million in equity "
            "to Liontown, supporting the underground ramp-up at Kathleen Valley in Western Australia, deploying government capital to de-risk a "
            "strategic asset and draw in private co-investment. Production is forecast to grow 6 percent in 2026 to roughly 120,300 tonnes of "
            "lithium, with compound annual growth of 4.9 percent projected through 2035.</p>"
            "<p>The combination of allied co-investment, domestic equity deployment, and an accelerating project pipeline is reorienting capital "
            "flows into Australian lithium. Speculative exposure is giving way to structured, long-term supply chain investment.</p>"
        ),
        "newsPageUrl": "lithium-gallium-and-a-very-expensive-friendship",
        "newsCreatedDate": datetime.date(2025, 12, 8),
        "newsMetaTitle": "Lithium, Gallium, and a Very Expensive Friendship",
        "newsMetaDescription": "A US-Australia framework commits $3 billion in near-term joint financing across an $8.5 billion critical minerals project pipeline",
        "isTopNews": "No",
    },
    {
        "category": "Regulatory",
        "newsTitle": "Tax Cuts, Stockpiles, and a Long Game on Lithium",
        "newsShortDescription": "Australia pairs a ten percent refining tax offset with a $1.2 billion strategic reserve to drive domestic lithium processing",
        "newsDescription": (
            "<p>Australia has enacted what officials and analysts describe as the most consequential domestic policy intervention in its critical "
            "minerals sector in a generation, combining a legislated tax incentive with a new strategic reserve designed to shift the country's "
            "lithium industry from raw ore exporter toward onshore chemical processing.</p>"
            "<p>The centrepiece of the overhaul is the Critical Minerals Production Tax Incentive, legislated under the Future Made in Australia "
            "Act, which received Royal Assent in February 2025. The incentive offers eligible processors a 10 percent refundable tax offset "
            "against Australian processing and refining costs, running from the 2027-28 financial year through 2039-40, available for up to ten "
            "years per qualifying project. To qualify, facilities must carry out substantial chemical transformation of a feedstock, producing "
            "outputs such as lithium hydroxide or refined carbonate rather than raw spodumene concentrate. Treasury estimates the policy will "
            "support more than 2.5 million tonnes of refined critical mineral output over its lifespan, with cumulative production potentially "
            "reaching 10 million tonnes by 2039-40.</p>"
            "<p>A second pillar, announced in January 2026, is a 1.2 billion Australian dollar Critical Minerals Strategic Reserve. The mechanism "
            "is designed to secure domestic production rights and on-sell those rights to allied partners during supply disruptions. Of the total "
            "allocation, 1 billion Australian dollars will come from an expanded 5 billion dollar Critical Minerals Facility, with a further 185 "
            "million dollars earmarked for selective stockpiling and implementation costs. Initial minerals covered include antimony, gallium, and "
            "rare earth elements; lithium is flagged as a priority candidate as the reserve scales toward full operational readiness in the second "
            "half of 2026.</p>"
            "<p>The two instruments serve distinct but complementary purposes. The tax incentive is intended to build sovereign refining capacity "
            "by improving the long-term commercial case for processing investment; the reserve is a market intervention mechanism that provides "
            "supply security during disruption events.</p>"
            "<p>Yet the structural challenges both instruments are meant to address has proved persistent. As analysts at the law firm Allens have "
            "noted, the cost gap between Australian processors and their Chinese counterparts cannot be closed by market forces alone. Whether "
            "sustained fiscal commitment will prove sufficient to bridge that divide, or whether the pace of policy implementation will keep step "
            "with rapidly shifting global supply chains, remains to be seen.</p>"
        ),
        "newsPageUrl": "tax-cuts-stockpiles-and-a-long-game-on-lithium",
        "newsCreatedDate": datetime.date(2026, 1, 13),
        "newsMetaTitle": "Tax Cuts, Stockpiles, and a Long Game on Lithium",
        "newsMetaDescription": "Australia pairs a ten percent refining tax offset with a $1.2 billion strategic reserve to drive domestic lithium processing",
        "isTopNews": "No",
    },
    {
        "category": "Research",
        "newsTitle": "Australia's Lithium Industry Gets Its First Emissions Report Card",
        "newsShortDescription": "Macquarie University study delivers first facility-level emissions baseline for Australian lithium, highlighting clear opportunities for lower-impact production",
        "newsDescription": (
            "<p>A peer-reviewed study has given Australia's lithium mining industry its most detailed environmental benchmark to date, "
            "identifying diesel consumption as the dominant source of emissions and outlining a clear route to reducing them.</p>"
            "<p>Published in Resources, Conservation and Recycling in January 2026, the research by Macquarie University's Shamsunnahar Setu "
            "and Vladimir Strezov applies Life Cycle Impact Assessment methodology to eight operational spodumene mines in Australia. The "
            "analysis delivers facility-level data that moves beyond earlier, broader industry estimates.</p>"
            "<p>The study puts the average global warming potential at 0.4 kg of CO₂ equivalent per kilogram of spodumene produced. Diesel "
            "use across mining and processing fleets accounts for roughly three-quarters of total energy consumption, making it the single "
            "largest emissions driver. The authors suggest that electrification of fleets, renewable energy integration, and more efficient "
            "fleet management could deliver near-term reductions.</p>"
            "<p>The research also quantifies particulate emissions and material handling impacts, giving operators data to support targeted "
            "interventions such as improved dust suppression, optimised beneficiation processes, and better tailings management.</p>"
            "<p>The findings carry weight beyond the laboratory. Australia supplies around half of global lithium ore, placing it at the centre "
            "of battery supply chains that face growing regulatory scrutiny. The EU Battery Regulation, among other frameworks, is increasing "
            "demand for verifiable lifecycle emissions data from producers. Facility-level benchmarks of the kind produced by the Macquarie "
            "study are becoming tools of commercial relevance, not merely academic interest.</p>"
            "<p>Several Australian operators are already advancing solar integration and hybrid energy systems alongside broader Scope 1 and 2 "
            "reduction programmes. Standardised data of this kind allows those initiatives to be measured and validated more rigorously, "
            "which matters as downstream buyers seek greater assurance about the provenance and environmental profile of the materials they purchase.</p>"
            "<p>The study is limited to upstream extraction and does not extend to refining or battery manufacturing. Whether the methodology "
            "will be applied across the full supply chain remains an open question, as does the pace at which individual operators move to act "
            "on its findings.</p>"
        ),
        "newsPageUrl": "australias-lithium-industry-gets-its-first-emissions-report-card",
        "newsCreatedDate": datetime.date(2026, 1, 19),
        "newsMetaTitle": "Australia's Lithium Industry Gets Its First Emissions Report Card",
        "newsMetaDescription": "Macquarie University study delivers first facility-level emissions baseline for Australian lithium, highlighting clear opportunities for lower-impact production",
        "isTopNews": "No",
    },
    {
        "category": "Insights",
        "newsTitle": "Pilbara's Deliberate Playbook Positions It for Lithium's Rebound",
        "newsShortDescription": "Pilbara Minerals' cost discipline, strong balance sheet, and sequenced growth pipeline put it at the front of Australia's lithium recovery",
        "newsDescription": (
            "<p>Australia's lithium sector is waking up, and the producers who ran tightest through the downturn are first in line to capitalise. "
            "Pilbara Minerals has emerged as the clearest example, posting a materially stronger first half of FY2026 while simultaneously "
            "unlocking a sequence of growth options it had held deliberately in reserve.</p>"
            "<p>The numbers tell a confident story. Revenue climbed 47 percent year-on-year to A$624 million, driven by a 40 percent improvement "
            "in realised pricing and a seven percent rise in sales volumes to 446,000 tonnes. The P1000 plant expansion at Pilgangoora added "
            "production capacity while pulling costs down across the operation. Total liquidity reached over A$1.6 billion, split between A$954 "
            "million in cash and A$625 million in undrawn credit. Managing Director Dale Henderson called the results validation of a strategy "
            "built on operational discipline, now converting into earnings as conditions improve.</p>"
            "<p>The most immediate move is the board-approved restart of the Ngungaju processing facility, which had been held in care and "
            "maintenance as a deliberate capital preservation call. The 200,000-tonne-per-annum plant is set to resume production in July 2026, "
            "backed by customer contracts and funded within existing FY26 capital guidance. Pilbara chose to preserve the asset rather than "
            "decommission it, and that decision is now paying off.</p>"
            "<p>Longer-range ambitions are also taking shape. A P2000 feasibility study is targeting an expansion of Pilgangoora to roughly 2 "
            "million tonnes per annum, with results expected in the December quarter of 2026. Separately, the Colina lithium project in Brazil, "
            "acquired through the Latin Resources transaction, is moving toward a feasibility study due in late 2027. Both remain subject to "
            "final investment decisions.</p>"
            "<p>The pattern is deliberate: capital preserved during the trough, assets kept intact, and growth options staged to deploy as the "
            "market turns. Pilbara Minerals didn't just survive the downturn. It used it.</p>"
        ),
        "newsPageUrl": "pilbaras-deliberate-playbook-positions-it-for-lithiums-rebound",
        "newsCreatedDate": datetime.date(2026, 2, 20),
        "newsMetaTitle": "Pilbara's Deliberate Playbook Positions It for Lithium's Rebound",
        "newsMetaDescription": "Pilbara Minerals' cost discipline, strong balance sheet, and sequenced growth pipeline put it at the front of Australia's lithium recovery",
        "isTopNews": "No",
    },
    {
        "category": "Innovation",
        "newsTitle": "Kwinana Shows Australia Can Do More Than Dig",
        "newsShortDescription": "Covalent Lithium's Kwinana refinery proves vertical integration can solve cost and quality challenges in Australian lithium hydroxide production",
        "newsDescription": (
            "<p>Australia has long been content to dig things up and ship them out. For lithium, that arrangement is changing, if slowly. "
            "Covalent Lithium's refinery in Kwinana, south of Perth, achieved first battery-grade lithium hydroxide production in mid-2025, "
            "making it the most complete mine-to-refinery lithium operation in the country. Whether it becomes a model for others depends on "
            "questions the industry is not yet ready to answer.</p>"
            "<p>The logic of integration is straightforward. Covalent draws its feedstock from the Mount Holland mine, also in Western Australia, "
            "where output was running above 80% of capacity through 2025. By processing its own concentrate rather than buying on the open market, "
            "the refinery avoids spodumene price swings and keeps feed quality consistent from ore through to finished product. That matters. "
            "Lithium hydroxide for electric vehicle batteries must meet stringent purity standards, and controlling every upstream variable helps. "
            "Wesfarmers, which co-owns the operation, said in its February 2026 half-year results that commissioning had been 'pleasing,' with "
            "the plant producing material to design specification.</p>"
            "<p>At full tilt, Kwinana is designed to produce around 50,000 tonnes of battery-grade lithium hydroxide per year, enough to supply "
            "batteries for roughly one million electric vehicles. It draws spodumene concentrate from Covalent's own Mount Holland mine, which "
            "ran above 80 percent of capacity through 2025. By processing its own concentrate rather than buying on the open market, the refinery "
            "avoids spodumene price swings and keeps feed quality consistent from ore through to finished product.</p>"
            "<p>Kwinana is one of three lithium hydroxide facilities now operating along Western Australia's industrial corridor, alongside the "
            "Tianqi Lithium Energy Australia plant and the recently idled Albemarle Kemerton facility. With an 18-month schedule to reach full "
            "capacity, Covalent's operation is the most significant live test of Australia's downstream processing ambitions to date. "
            "Policymakers and investors have placed a substantial bet on the integrated mine-to-hydroxide model as the country's path to "
            "capturing more value from its resources. Kwinana is where that bet gets scored.</p>"
        ),
        "newsPageUrl": "kwinana-shows-australia-can-do-more-than-dig",
        "newsCreatedDate": datetime.date(2026, 2, 24),
        "newsMetaTitle": "Kwinana Shows Australia Can Do More Than Dig",
        "newsMetaDescription": "Covalent Lithium's Kwinana refinery proves vertical integration can solve cost and quality challenges in Australian lithium hydroxide production",
        "isTopNews": "No",
    },
    {
        "category": "Innovation",
        "newsTitle": "Kiln It Softly: The Electric Upgrade Lithium Needed",
        "newsShortDescription": "The world's first electric spodumene calciner is built and nearing commissioning, promising to cut lithium refining emissions by over 80 percent",
        "newsDescription": (
            "<p>Electric kiln nears test in lithium's carbon push.</p>"
            "<p>An electric calciner in Western Australia could transform battery supply chains, with licensing rights extending globally. "
            "Construction is complete on what is claimed to be the world's first electric spodumene calciner, built at the Pilgangoora lithium "
            "operation in Western Australia. The project, a joint venture between Pilbara Minerals and Calix, replaces coal-fired rotary kilns "
            "with an electrically powered system designed to run on renewable energy. Commissioning is under way following a construction "
            "milestone reached in February 2026.</p>"
            "<p>Spodumene calcination, a heat-intensive process that converts lithium ore into a usable intermediate form, has long been one of "
            "the most carbon-heavy steps in battery material production. Life cycle assessments indicate the new process can cut emissions from "
            "that step by more than 80 per cent against coal-fired alternatives.</p>"
            "<p>The commercial logic is direct. European battery manufacturers and automakers now face binding rules on supply chain carbon "
            "reporting, and upstream suppliers without low-emissions credentials face pricing pressure and restricted market access in key "
            "Western markets.</p>"
            "<p>The plant is engineered to produce more than 3,000 tonnes per year of lithium phosphate salt, a higher-value intermediate than "
            "conventional output, while also reducing waste volumes requiring off-site disposal.</p>"
            "<p>In February 2026, Pilbara Minerals acquired full ownership of the demonstration plant from Calix for A$11.4 million. Calix retains "
            "the intellectual property and continues providing technical support. Both parties retain independent rights to license the technology "
            "to third parties across the global primary lithium market, a provision that extends the project's commercial reach well beyond a "
            "single site. Hard-rock calcination is a core processing step across emerging lithium operations in the United States, Canada, and Europe.</p>"
            "<p>The project has drawn A$35 million in combined government funding: A$20 million from the Australian federal government and A$15 "
            "million from Western Australia, reflecting a judgement that the technology's relevance extends across the industry rather than to a "
            "single operator.</p>"
            "<p>Whether commissioning confirms the economics at commercial scale remains the open question. The answer will determine whether "
            "the electric calciner becomes a replicable standard or remains a well-funded proof of concept.</p>"
        ),
        "newsPageUrl": "kiln-it-softly-the-electric-upgrade-lithium-needed",
        "newsCreatedDate": datetime.date(2026, 2, 28),
        "newsMetaTitle": "Kiln It Softly: The Electric Upgrade Lithium Needed",
        "newsMetaDescription": "The world's first electric spodumene calciner is built and nearing commissioning, promising to cut lithium refining emissions by over 80 percent",
        "isTopNews": "No",
    },
    {
        "category": "Technology",
        "newsTitle": "Covalent Cracks the Code on Downstream Lithium",
        "newsShortDescription": "Covalent Lithium's Kwinana refinery has produced its first battery-grade lithium hydroxide, putting Australia's mine-to-market model to the test",
        "newsDescription": (
            "<p>Australia has long been the world's top lithium producer. It has also long watched the real money get made elsewhere. That gap "
            "is narrowing.</p>"
            "<p>In mid-2025, Covalent Lithium confirmed first production of battery-grade lithium hydroxide at its Kwinana refinery in Western "
            "Australia, a milestone that shifted one of the country's most complex industrial projects from construction phase into live "
            "commissioning. For the first time at commercial scale, Australia's integrated mine-to-refinery model was running for real.</p>"
            "<p>The Kwinana plant is designed to produce around 50,000 tonnes of battery-grade lithium hydroxide annually, enough to supply "
            "batteries for roughly one million electric vehicles. It draws spodumene concentrate from Covalent's own Mount Holland mine, which "
            "ran above 80 percent of capacity through 2025. That vertical integration isn't just a supply chain convenience. By controlling "
            "feedstock quality from ore to output, Covalent runs continuous process monitoring across the full conversion chain, tracking trace "
            "elements like iron, calcium, and magnesium through calcination, leaching, impurity removal, and crystallization. Battery "
            "manufacturers set punishing purity standards, and meeting them starts long before the refinery.</p>"
            "<p>Wesfarmers, the parent company, described commissioning performance in its February 2026 half-year results as pleasing, with "
            "the plant producing hydroxide that meets design specifications. The ramp-up timeline was extended modestly to address intermittent "
            "operational issues, while surplus concentrate is sold into the spot market during the transition, a buffer that vertical "
            "integration makes possible.</p>"
            "<p>Kwinana is one of three lithium hydroxide facilities now operating along Western Australia's industrial corridor, alongside the "
            "Tianqi Lithium Energy Australia plant and the recently idled Albemarle Kemerton facility. With an 18-month schedule to reach full "
            "capacity, Covalent's operation is the most significant live test of Australia's downstream processing ambitions to date. "
            "Policymakers and investors have placed a substantial bet on the integrated mine-to-hydroxide model as the country's path to "
            "capturing more value from its resources. Kwinana is where that bet gets scored.</p>"
        ),
        "newsPageUrl": "covalent-cracks-the-code-on-downstream-lithium",
        "newsCreatedDate": datetime.date(2026, 3, 6),
        "newsMetaTitle": "Covalent Cracks the Code on Downstream Lithium",
        "newsMetaDescription": "Covalent Lithium's Kwinana refinery has produced its first battery-grade lithium hydroxide, putting Australia's mine-to-market model to the test",
        "isTopNews": "No",
    },
    {
        "category": "Partnerships",
        "newsTitle": "Australia's Lithium Just Got a Direct Line to Europe",
        "newsShortDescription": "An EU-Australia trade deal scraps tariffs on lithium hydroxide, giving Europe a direct supply route outside China",
        "newsDescription": (
            "<p>Eight years of negotiation ended on March 24, 2026, when Australia and the European Union signed a sweeping free trade "
            "agreement eliminating tariffs on nearly all goods moving between the two economies. For the lithium sector, the payoff is "
            "concrete: zero tariffs on critical minerals and lithium hydroxide, the battery-grade refined product that commands a premium "
            "over raw spodumene and that European manufacturers have been desperately sourcing from outside China.</p>"
            "<p>The minerals dimension dominated the deal's final stretch. European Commission President Ursula von der Leyen traveled to "
            "Canberra for the signing alongside Trade Commissioner Maros Sefcovic, announcing four joint production projects covering rare "
            "earths, lithium, and tungsten. Australia's Austrade confirmed that all tariffs on energy and resource products, including hydrogen "
            "carriers, will be fully eliminated. The deal also clears duties on environmental goods, among them solar panel components and "
            "lithium batteries, creating an integrated clean energy trade corridor between the two economies.</p>"
            "<p>For European battery manufacturers and automakers racing to build out cell production, the agreement offers more than a tariff "
            "cut. It provides a rules-based framework for long-term supply partnerships with Australian producers, rather than reliance on "
            "volatile spot markets. The EU is the world's largest consumer of critical raw materials relative to its domestic capacity, and "
            "reducing dependence on Chinese-controlled processing networks is explicit policy. Australia, which accounts for close to half of "
            "global lithium ore output, is the obvious counterpart.</p>"
            "<p>The Minerals Council of Australia noted that tariff elimination strengthens competitiveness and cements open trade with the EU, "
            "Australia's second-largest source of foreign investment. Analysts expect European capital flows into Australian mining, downstream "
            "processing, and critical minerals projects to increase materially once the deal enters force. That ratification process could take "
            "up to two years as the agreement works through EU member states, but the commercial and investment signals are already moving.</p>"
        ),
        "newsPageUrl": "australias-lithium-just-got-a-direct-line-to-europe",
        "newsCreatedDate": datetime.date(2026, 3, 26),
        "newsMetaTitle": "Australia's Lithium Just Got a Direct Line to Europe",
        "newsMetaDescription": "An EU-Australia trade deal scraps tariffs on lithium hydroxide, giving Europe a direct supply route outside China",
        "isTopNews": "No",
    },
]


class Command(BaseCommand):
    help = "Upload 10 LDZ 2026 news articles from the content form PDF"

    def handle(self, *args, **options):
        self.stdout.write("Creating news categories...")
        category_map = {}
        for cat_name in NEWS_CATEGORIES:
            obj, created = newsCategory.objects.get_or_create(
                categoryName=cat_name,
                isDelete="No",
                defaults={"created_by": "Admin", "updated_by": "Admin"},
            )
            category_map[cat_name] = obj
            status = "created" if created else "already exists"
            self.stdout.write(f"  [{status}] {cat_name}")

        self.stdout.write("\nUploading news articles...")
        created_count = 0
        skipped_count = 0

        for article in NEWS_ARTICLES:
            cat_obj = category_map[article["category"]]

            if generalNewsPoint.objects.filter(newsTitle=article["newsTitle"], isDelete="No").exists():
                self.stdout.write(f"  [skipped] {article['newsTitle']}")
                skipped_count += 1
                continue

            generalNewsPoint.objects.create(
                newsCategoryId=cat_obj,
                newsTitle=article["newsTitle"],
                newsShortDescription=article["newsShortDescription"],
                newsDescription=article["newsDescription"],
                newsPageUrl=article["newsPageUrl"],
                newsCreatedDate=article["newsCreatedDate"],
                isTopNews=article["isTopNews"],
                newsMetaTitle=article["newsMetaTitle"],
                newsMetaDescription=article["newsMetaDescription"],
                newsImageAltText="",
                newsImage="",
                created_by="Admin",
                updated_by="Admin",
                isDelete="No",
            )
            self.stdout.write(f"  [created] {article['newsTitle']}")
            created_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"\nDone. {created_count} articles created, {skipped_count} skipped (already exist)."
            )
        )
