import { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "../Footer";
import "../assets/css/TermsAndConditions.css";
import { Helmet } from "react-helmet-async";
import { usePageSeo } from "../common/usePageSeo";
const TermsAndConditions = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const conductRef1 = useRef(null);
  const conductRef2 = useRef(null);
  const CONDUCT_URL = "https://iq-hub.com/code-of-conduct";

  useEffect(() => {
    const observers = [conductRef1, conductRef2].map((ref) => {
      const link = ref.current;
      if (!link) return null;
      const observer = new MutationObserver(() => {
        observer.disconnect();
        link.setAttribute("href", CONDUCT_URL);
        observer.observe(link, { attributes: true, attributeFilter: ["href"] });
      });
      observer.observe(link, { attributes: true, attributeFilter: ["href"] });
      return observer;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  const pageSeo = usePageSeo("terms-conditions");
  const seoTitle = pageSeo.pageMetaTitle;
  const seoDescription = pageSeo.pageMetaDescription;
  const seoImage = pageSeo.pageOgImage || null;

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <link rel="canonical" href="https://www.australia.lithium-downstream-summit.com/terms-and-conditions" />
      </Helmet>
      <div style={{ marginTop: windowWidth > 1024 ? "120px" : "" }}>
        <Navbar forceScrolled />
        <div className="TermsAndConditions_container__xOKXK">
          <div className="TermsAndConditions_innerContainer__wAJIf">
            <h1>terms & conditions</h1>
            <div className="TermsAndConditions_section__zAzp-">
              <h4>1. Scope of Agreement</h4>
              <p>
                This legally binding Agreement ("Agreement") is hereby executed and effective between the Attendee and IQ International Pte. Ltd ("Organizer"), collectively referred to as the "Parties," and governs the comprehensive terms and conditions governing the provision and utilization of services, including, but not limited to, the Attendee's participation in the specific event (hereinafter referred to as the "Event") occurring on the agreed-upon date and venue. Any capitalized terms not explicitly defined herein shall be construed as per their definitions set forth during the registration process.
              </p>
            </div>
            <div className="TermsAndConditions_section__zAzp-">
              <h4>2. Definition of 'Attendee'</h4>
              <p>
                For the purposes of this Agreement, the term 'Attendee' encompasses all individuals, groups, entities, or organizations participating in the Event, irrespective of their payment status. This all-encompassing definition includes those who have fulfilled payments, those with outstanding payments, and those attending on a complimentary basis. Distinct categories of Attendees include, but are not limited to, the following:
                <div className="TermsAndConditions_divider__b7Fdc"></div>
                a) Participants: This category incorporates all individuals or entities that have registered for the Event. Participants may engage in various activities at the Event, including attending sessions, participating in workshops, and availing themselves of networking opportunities.
                <div className="TermsAndConditions_divider__b7Fdc"></div>
                b) Exhibitors and Sponsors: These entities or individuals have a commercial or promotional role at the Event. Exhibitors typically showcase products or services in designated areas, while sponsors may provide financial or service-based support for the Event, often in exchange for marketing privileges.
                <div className="TermsAndConditions_divider__b7Fdc"></div>
                c) Speakers, Panel Members, and Moderators: This category encompasses individuals engaged in delivering talks, presentations, or seminars; members participating in panel discussions; moderators overseeing discussions or sessions; event hosts responsible for presenting or supervising various segments of the Event; and any individuals performing on stage or in front of the audience in any capacity.
                <div className="TermsAndConditions_divider__b7Fdc"></div>
                d) Media Representatives: This group includes journalists, reporters, bloggers, and other members of the media who attend the Event to report on proceedings, conduct interviews, and document the Event's activities.
                <div className="TermsAndConditions_divider__b7Fdc"></div>
                e) Governmental, Non-Governmental, and Associative Entities: This category pertains to representatives or members from government organizations, associations, non-governmental organizations (NGOs), and other entities participating in the Event. They may attend for networking purposes, to represent their organizations, or to engage in collaborative activities.
              </p>
            </div>
            <div className="TermsAndConditions_section__zAzp-">
              <h4>3. Attendance at the Event</h4>
              <p>
                <div className="TermsAndConditions_divider__b7Fdc"></div>
                a) Registration confers the right to access pre-scheduled conference, seminars, sessions, and networking activities, as outlined in the event program.
                <div className="TermsAndConditions_divider__b7Fdc"></div>
                b) Participation in business meetings is entirely subject to the sole discretion of all parties involved. Submission of meeting preferences does not guarantee their fulfillment.
                <div className="TermsAndConditions_divider__b7Fdc"></div>
                c) The Organizer explicitly disclaims all liability for inaccuracies in provided information, changes in attendee lists, or missed appointments.
                <div className="TermsAndConditions_divider__b7Fdc"></div>
                d) Attendees are unequivocally mandated to maintain the utmost professional conduct and to unreservedly comply with all rules and regulations established by the Organizer and the Venue.
                <div className="TermsAndConditions_divider__b7Fdc"></div>
                e) All materials disseminated during the Event are unequivocally subject to intellectual property rights. Any unauthorized use is categorically prohibited.
                <div className="TermsAndConditions_divider__b7Fdc"></div>
                f) The Organizer unequivocally disclaims any representations or warranties regarding the number of attendees, the identity or qualifications of speakers, or the veracity of Event content. The Organizer will not be held liable for any dissatisfaction, misinformation, or alterations to the Event details.
                <div className="TermsAndConditions_divider__b7Fdc"></div>
                g) Attendees are singularly responsible for the safety and security of their personal belongings. The Organizer explicitly disclaims any liability for the loss, damage, or theft of any personal items brought to the Event by Attendees.
              </p>
            </div>
            <div className="TermsAndConditions_section__zAzp-">
              <h4>4. Modifications by the Organizer</h4>
              <p>
                <div className="TermsAndConditions_divider__b7Fdc"></div>
                a) The Organizer expressly reserves the unassailable right to postpone, amend, or alter the Event’s timing, location, or content should circumstances arise rendering the Event commercially unviable. No refunds shall be issued under such circumstances.
                <div className="TermsAndConditions_divider__b7Fdc"></div>
                b) Access to the Event is unequivocally contingent upon full payment of the Fee. The Organizer reserves the unfettered right to withhold information or deny entry in the case of non-payment or commercial risk to the Event.
                <div className="TermsAndConditions_divider__b7Fdc"></div>
                c) The Organizer may, at its unchallengeable discretion, alter the Venue or cancel the Event, subject to timely notification to Attendees. In the event of cancellations by the Organizer, the Event may be rescheduled within a 12-month period, without entitlement to refunds.
                <div className="TermsAndConditions_divider__b7Fdc"></div>
                d) The Organizer expressly reserves the right to cancel any bookings. In such cases, the Attendee shall be offered the option to attend a rescheduled Event or transfer their registration to a future event organised by the Organizer. No monetary refunds shall be issued.
                <div className="TermsAndConditions_divider__b7Fdc"></div>
                e) The Organizer shall not be liable for any indirect costs (including, but not limited to, travel and accommodation expenses) incurred by Attendees due to alterations in the Event schedule.
                <div className="TermsAndConditions_divider__b7Fdc"></div>
                f) The Organizer unequivocally disavows responsibility for the condition of the venue facilities, any property damage, or personal injuries sustained during the Event.
              </p>
            </div>
            <div className="TermsAndConditions_section__zAzp-">
              <h4>5. Force Majeure</h4>
              <p>
                The Organizer shall be categorically exempt from any liability for the failure to fulfill its obligations hereunder in cases where such failure is the result of any cause beyond the Organizer's reasonable control, including, but not limited to, mechanical, electronic, or communications failure or degradation, acts of God, natural disasters, pandemics, whether officially declared by relevant health authorities, or otherwise, perceived risks to health and safety, acts of terrorism, or governmental actions.
              </p>
            </div>
            <div className="TermsAndConditions_section__zAzp-">
              <h4>6. Compliance with Laws and Regulations</h4>
              <p>
                Attendees are solemnly committed to unwavering compliance with all applicable laws, regulations, and ordinances throughout the duration of the Event.
              </p>
            </div>
            <div className="TermsAndConditions_section__zAzp-">
              <h4>7. Anti-Corruption and Bribery</h4>
              <p>
                All parties involved in the Event are duty-bound to adhere to the applicable anti-corruption and anti-bribery laws and shall conduct all activities related to the Event in an unblemished, ethical, and lawful manner.
              </p>
            </div>
            <div className="TermsAndConditions_section__zAzp-">
              <h4>8. Code of Conduct</h4>
              <p>
                All Attendees are subject to a{' '}
                <a
                  ref={conductRef1}
                  href={CONDUCT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={(e) => { e.currentTarget.setAttribute("href", CONDUCT_URL); }}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); (window.__originalOpen || window.open)(CONDUCT_URL, "_blank", "noopener,noreferrer"); }}
                >
                  Code of Conduct
                </a>
                , separately detailed, which unambiguously delineates behavioral expectations, including policies on harassment, discrimination, and other forms of misconduct.
              </p>
            </div>
            <div className="TermsAndConditions_section__zAzp-">
              <h4>9. Photography and Recording Policy</h4>
              <p>
                The policies governing photography, video recording, and audio recording are explicitly regulated by specific guidelines set forth by the Organizer. Attendees will be subjected to consent requirements for the utilization of their image or likeness in materials arising from the Event.
              </p>
            </div>
            <div className="TermsAndConditions_section__zAzp-">
              <h4>10. Limitation of Liability for Third-Party Actions</h4>
              <p>
                The Organizer categorically disavows any liability for the actions or omissions of third-party service providers, vendors, or partners associated with the Event
              </p>
            </div>
            <div className="TermsAndConditions_section__zAzp-">
              <h4>11. Governing Law and Jurisdiction</h4>
              <p>
                This Agreement shall be governed by and construed in accordance with the laws of the Republic of Singapore, without regard to its conflict of laws principles.
              </p>
            </div>
            <div className="TermsAndConditions_section__zAzp-">
              <h4>12. Intellectual Property of Event Content</h4>
              <p>
                All intellectual property rights in the content presented at the Event shall remain the exclusive property of their respective owners. The usage of such content by Attendees is subject to limitations as established by the Organizer or the content owner.
              </p>
            </div>
            <div className="TermsAndConditions_section__zAzp-">
              <h4>13. Insurance Requirements</h4>
              <p>
                Exhibitors, sponsors, and certain other participants will be mandatorily required to maintain adequate insurance coverage.
              </p>
            </div>
            <div className="TermsAndConditions_section__zAzp-">
              <h4>14. Financial Obligations and Cancellations by the Attendee</h4>
              <p>
                a) The Total Fees shall be paid as specified in the registration process.
                <div className="TermsAndConditions_divider__b7Fdc"></div>
                b) Discounts (Early Bird or Special Group) necessitate payment before the stipulated cut-off date.
                <div className="TermsAndConditions_divider__b7Fdc"></div>
                c) Attendees are exclusively accountable for their accommodation, travel, and other personal expenses.
                <div className="TermsAndConditions_divider__b7Fdc"></div>
                d) Attendee bookings are transferable but irrevocably non-cancellable. Any substitute Attendee must be approved by the Organizer and must assent to these Terms.
                <div className="TermsAndConditions_divider__b7Fdc"></div>
                e)In cases where an Attendee is unable to attend due to a denied or delayed visa application, no monetary refund shall be issued. The Organizer shall, at its sole discretion, offer a credit toward a future event organised by the Organizer.
              </p>
            </div>
            <div className="TermsAndConditions_section__zAzp-">
              <h4>15. Sponsors and Exhibitors</h4>
              <p>
                In the event of cancellation initiated by the Organizer, alternative opportunities shall be extended or a complete refund shall be issued. Refunds shall not be extended for cancellations initiated by Exhibitors or Sponsors.
              </p>
            </div>
            <div className="TermsAndConditions_section__zAzp-">
              <h4>16. General Provisions</h4>
              <p>
                <div className="TermsAndConditions_divider__b7Fdc"></div>
                a) This Agreement constitutes the entire agreement between the Parties and supersedes all prior understandings or agreements.**
                <div className="TermsAndConditions_divider__b7Fdc"></div>
                b) Nothing in this Agreement excludes or limits liability for fraud or for any injury or loss caused by the Organizer's negligence.**
                <div className="TermsAndConditions_divider__b7Fdc"></div>
                c) The Organizer's total liability under this Agreement is strictly limited to the fees paid by the Attendee.
                <div className="TermsAndConditions_divider__b7Fdc"></div>
                d) The rights of the Attendee under this Agreement are inalienable and non-transferable.
                <div className="TermsAndConditions_divider__b7Fdc"></div>
                e) All correspondence relating to this Agreement must be in written form.
                <div className="TermsAndConditions_divider__b7Fdc"></div>
                f) Any disputes arising under this Agreement shall be subject to binding arbitration in Singapore, in accordance with the rules of the Singapore International Arbitration Centre (SIAC).
              </p>
            </div>
            <div className="TermsAndConditions_section__zAzp-">
              <h4>17. Data Protection</h4>
              <p>
                <div className="TermsAndConditions_divider__b7Fdc"></div>
                (a) Personal data provided by Attendees shall be treated with the utmost confidentiality and handled in accordance with applicable data protection laws and our Privacy Policy, available at <a href="/privacy-policy" rel="noopener noreferrer" style={{ color: 'Privacy Policy' }}>Privacy Policy</a>. This data may be shared within our Group and with external partners unless an opt-out is explicitly communicated by the Attendee.
                <div className="TermsAndConditions_divider__b7Fdc"></div>
                (b) Personal data collected from Attendees shall be retained solely for the duration necessary for the purposes elucidated and in strict compliance with applicable data protection laws. Attendees shall be informed of the specific applications of their data, and all such data shall be handled with the highest degree of security and confidentiality.
              </p>
            </div>
            <div className="TermsAndConditions_section__zAzp-">
              <h4>18. Dispute Resolution Mechanism</h4>
              <p>
                In the event of a dispute, the Parties hereby commit to engaging in good-faith negotiations for a period of 30 days. In the event that the dispute remains unresolved, it shall be referred to binding arbitration in Singapore, in accordance with the rules of the Singapore International Arbitration Centre (SIAC).
              </p>
            </div>
            <div className="TermsAndConditions_section__zAzp-">
              <h4>19. Data Security and Cyber Liability</h4>
              <p>
                The Organizer solemnly pledges to maintain the utmost security of collected data. In the event of a data breach or cyber-attack, liability shall be assessed in strict accordance with relevant laws and regulations.
              </p>
            </div>
            <div className="TermsAndConditions_section__zAzp-">
              <h4>20. Intellectual Property of Attendees</h4>
              <p>
                Intellectual property introduced or generated by Attendees shall indisputably remain their property, unless otherwise explicitly agreed upon in writing.
              </p>
            </div>
            <div className="TermsAndConditions_section__zAzp-">
              <h4>21. Indemnification Clause</h4>
              <p>
                Attendees hereby solemnly agree to indemnify the Organizer against all claims arising from damages caused by the Attendees.
              </p>
            </div>
            <div className="TermsAndConditions_section__zAzp-">
              <h4>22. Compliance with Health and Safety Regulations</h4>
              <p>
                Attendees shall unquestionably comply with all health and safety regulations as mandated by the Venue, local authorities, or the Organizer.
              </p>
            </div>
            <div className="TermsAndConditions_section__zAzp-">
              <h4>23. Alterations to the Agenda or Speakers</h4>
              <p>
                The Organizer hereby reserves the unequivocal right to effect alterations to the agenda or speakers and shall duly inform Attendees of any substantial changes.
              </p>
            </div>
            <div className="TermsAndConditions_section__zAzp-">
              <h4>24. Specific Terms for Networking or Matchmaking Services</h4>
              <p>
                Attendees engaging in networking and matchmaking services at the Event affirmatively acknowledge and consent that the Organizer shall not be held responsible for any disputes or disagreements that may arise between Attendees who connect via these services. The Organizer provides these services exclusively as a facilitator, and any connections formed are undertaken at the sole discretion and risk of the Attendees.
              </p>
            </div>
            <div className="TermsAndConditions_section__zAzp-">
              <h4>25. Limitations on Marketing Activities by Attendees</h4>
              <p>
                Marketing activities undertaken by Attendees, especially Exhibitors and Sponsors, shall be strictly subject by the Organizer.
              </p>
            </div>
            <div className="TermsAndConditions_section__zAzp-">
              <h4>26. Right to Refuse Admission</h4>
              <p>
                The Organizer unequivocally reserves the absolute right to refuse admission or eject Attendees for non-compliance with the{' '}
                <a
                  ref={conductRef2}
                  href={CONDUCT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={(e) => { e.currentTarget.setAttribute("href", CONDUCT_URL); }}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); (window.__originalOpen || window.open)(CONDUCT_URL, "_blank", "noopener,noreferrer"); }}
                >
                  Code of Conduct
                </a>, or deems the Attendee to be a commercial risk to the Event.
              </p>
            </div>
            <div className="TermsAndConditions_section__zAzp-">
              <h4>27. Use of Event Materials Post-Event</h4>
              <p>
                Guidelines pertaining to the post-event utilization of materials or recordings shall be provided by the Organizer.
              </p>
            </div>
            <div className="TermsAndConditions_section__zAzp-">
              <h4>28. Feedback and Complaints Procedure</h4>
              <p>
                A detailed procedure for submitting feedback or complaints is readily available, with explicit provisions on how these matters shall be addressed.
              </p>
            </div>
            <div className="TermsAndConditions_section__zAzp-">
              <h4>29. Amendments to Terms and Conditions</h4>
              <p>
                The Organizer unreservedly reserves the right to amend these Terms & Conditions at any time.
              </p>
            </div>
            <div className="TermsAndConditions_section__zAzp-">
              <h4>30. Severability Clause</h4>
              <p>
                In the event that any portion of this Agreement is determined to be unenforceable, the remainder of the Agreement shall remain valid and enforceable.
              </p>
            </div>
            <div className="TermsAndConditions_section__zAzp-">
              <h4>31. Non-Discrimination Clause</h4>
              <p>
                The Organizer is unwaveringly committed to providing an inclusive and respectful environment for all Attendees. Discrimination of any kind based on race, color, religion, gender, national origin, age, disability, or any other protected characteristic is sternly prohibited.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default TermsAndConditions;
