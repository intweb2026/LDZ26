import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "../Footer";
import "../assets/css/privacyPolicy.css";
import { Helmet } from "react-helmet-async";
import { usePageSeo } from "../common/usePageSeo";
import API_BASE_URL from '../config/apiConfig';
const PrivacyPolicy = () => {
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

  const pageSeo = usePageSeo("privacy-policy");
  const seoTitle = pageSeo.pageMetaTitle;
  const seoDesc = pageSeo.pageMetaDescription;
  const seoImage = pageSeo.pageOgImage || null;

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:type" content="website" />
        {seoImage && <meta property="og:image" content={seoImage} />}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />
        {seoImage && <meta name="twitter:image" content={seoImage} />}
        <link rel="canonical" href=`${API_BASE_URL}/privacy-policy` />
      </Helmet>
      <div style={{ marginTop: windowWidth > 1024 ? "120px" : "" }}>
        <Navbar forceScrolled />
        <div className="PrivacyPolicy_container__UAuTf">
          <div className="PrivacyPolicy_innerContainer__TG2Bz">
            <h1>Privacy policy</h1>
            <div className="PrivacyPolicy_section__HSTzJ">
              <p>
                This Privacy Policy explains how IQ International Pte. Ltd Company (referred to as "the Company") and its trading name 'IQ Hub' collect, use, and protect personal information. References to “IQ Hub,” "we," "us," or "our" refer to the relevant data controller within the Company responsible for processing your personal information.
                <div className="PrivacyPolicy_divider__7q4hL"></div>
                <span>IQ International Pte. Ltd,</span>
                as the legal entity and data controller, is responsible for personal data in accordance with this Privacy Policy. This entity is identified on booking, web, and contract forms, or invoices. By using IQ Hub’s services, you consent to the practices described in this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not use our services. We are committed to safeguarding your privacy and ensuring the security of your personal information.
                <div className="PrivacyPolicy_divider__7q4hL"></div>
                To update your personal information or marketing preferences, you can contact us at
                <a href="mailto:info@iq-hub.com"> info@iq-hub.com</a>
                . For any data privacy queries, address them to the IQ Hub Privacy Team.
              </p>
            </div>
            <div className="PrivacyPolicy_section__HSTzJ">
              <h4>1. Information We Collect</h4>
              <p>We collect various types pf personal data.</p>
              <ul>
                <li>
                  <strong>Contact Details: </strong>
                  Your name, email address, postal address, and telephone number.
                </li>
                <li>
                  <strong>Educational, Nationality, and Professional information: </strong>
                  Information relevant to your educational and professional background.
                </li>
                <li>
                  <strong>Usernames and Passwords: </strong>
                  Credentials for accessing our services or those of third parties with whom we are affiliated.
                </li>
                <li>
                  <strong>Payment Information: </strong>
                  Credit or debit card numbers or bank account details for transactions.
                </li>
                <li>
                  <strong>Comments, Feedback, Posts, and other content you submit: </strong>
                  Content you submit, including survey responses.
                </li>
                <li>
                  <strong>Interests and Communication Preferences: </strong>
                  Your marketing permissions and communication preferences.
                </li>
                <li>
                  <strong>Location Information: </strong>
                  If provided through a mobile app.
                </li>
                <li>
                  <strong>Identity verification information: </strong>
                  Including, but limited to, residency or passport details, to comply with legal obligations and provide visa invitation letters where requested.
                </li>
                <li>
                  <strong>Website and Communication Usage Information: </strong>
                  Details of your use of our website and services, obtained through cookies or other tracking technologies.
                </li>
              </ul>
              <p style={{ marginTop: "25px" }}>This personal information pertains, but is not limited to:</p>
              <ul>
                <li>
                  Prospects, customer contacts, subscribers, and users of our services and products.
                </li>
                <li>
                  Visitors, sponsors, exhibitors, and speakers at our events.
                </li>
                <li>
                  Professionals featured in our digital and print products.
                </li>
                <li>
                  Authors, editors, and reviewers of our publications.
                </li>
                <li>
                  Contacts of our service providers and business partners.
                </li>
              </ul>
            </div>
            <div className="PrivacyPolicy_section__HSTzJ">
              <h4>2. Sensitive Personal Information</h4>
              <p>If we collect or store sensitive personal information, such as health-related data or information about beliefs or political affiliation, we will request your consent unless certain exceptions apply. Exceptions may occur, such as in cases of emergencies. Your privacy rights will always be protected.</p>
            </div>
            <div className="PrivacyPolicy_section__HSTzJ">
              <h4>3. Children's Personal Information</h4>
              <p>Our services and products are intended for business professionals and not for children under the age of sixteen. We do not knowingly collect personal information from users in this age group.</p>
            </div>
            <div className="PrivacyPolicy_section__HSTzJ">
              <h4>4. How and Why We Use Personal Information</h4>
              <p>We use personal information for purposes like product inquiries, sales, administration, call monitoring, professional information use, event and exhibition management, publishing services, marketing, customer and prospect management, mobile applications, website analytics, online and public community boards, and responding to inquiries. These activities help us provide and improve our services, fulfill our contractual obligations, enhance event experiences, disseminate and promote work, manage customer relationships, and ensure legal compliance.</p>
            </div>
            <div className="PrivacyPolicy_section__HSTzJ">
              <h4>5. Inquiries</h4>
              <p>
                When you provide personal information on our websites or through our social media platforms, we use this information exclusively for communication purposes with you. This means that we may contact you to respond to your inquiries, address your concerns, or provide information related to our products and services that you have shown interest in.
                <div className="PrivacyPolicy_divider__7q4hL"></div>
                Additionally, the information you provide in your inquiries may be included in our marketing or customer prospect databases. This inclusion allows us to tailor our communications with you, ensuring that we provide you with relevant updates, promotions, and offerings that align with your interests and preferences.
                <div className="PrivacyPolicy_divider__7q4hL"></div>
                Rest assured that we handle your personal information responsibly and in line with our commitment to safeguarding your privacy and ensuring the security of your data. If you ever wish to modify how we use your information or if you have questions about our data practices, please don't hesitate to contact us at
                <a href="mailto:info@iq-hub.com"> info@iq-hub.com</a>
                . Your satisfaction and data privacy are of utmost importance to us.
              </p>
            </div>
            <div className="PrivacyPolicy_section__HSTzJ">
              <h4>6. Updating Your Information and Preferences</h4>
              <p>
                We are committed to helping you maintain control over your personal information. Our goal is to ensure that the personal information we hold about you is accurate and up-to-date. We always provide the opportunity for you to unsubscribe or opt out of future marketing communications. While information on how to unsubscribe or opt out may not be included in every email we send, you can easily update, correct, or opt out of future communications at any time. Simply send an email to
                <a href="mailto:info@iq-hub.com"> info@iq-hub.com </a>
                with your request, and we will promptly address your preferences.
              </p>
            </div>
            <div className="PrivacyPolicy_section__HSTzJ">
              <h4>7. Fulfilling Legal Obligations</h4>
              <p>
                We may process personal information to comply with legal and regulatory requirements, respond to inquiries, investigations, or proceedings, and prevent fraud. We process your personal information to fulfill our legal and regulatory obligations or respond to regulatory authorities, where applicable. This may involve disclosing your personal information to third parties, court services, regulators, or law enforcement agencies in connection with inquiries, proceedings, or investigations by such parties worldwide or when legally compelled to do so.
                <div className="PrivacyPolicy_divider__7q4hL"></div>
                In certain situations, we may have a legal obligation to disclose your personal information because a court, law enforcement agency, another judicial or government entity has made such a request.
              </p>
            </div>
            <div className="PrivacyPolicy_section__HSTzJ">
              <h4>8. Data Protection Measures</h4>
              <p>
                At IQ Hub, we hold a strong commitment to data protection. We handle your personal information with the utmost care and security. Our robust security measures are designed to safeguard your data and control access. We have established comprehensive security and data protection policies to ensure the highest standards of information security. Electronic data and databases are securely stored on protected computer systems with stringent access controls in place.
                <div className="PrivacyPolicy_divider__7q4hL"></div>
                While we diligently take all reasonable precautions to maintain the security of your personal information, it's important to note that we cannot guarantee its security during transmission to external websites or services, as we do not have control over those transmissions.
              </p>
            </div>
            <div className="PrivacyPolicy_section__HSTzJ">
              <h4>9. Data Retention</h4>
              <p>
                We retain personal information for as long as necessary for the purposes described in this policy or as required by applicable laws. Afterward, data is securely deleted or destroyed. We will keep personal information during its use, as explained in the section above. Even after ceasing such uses, we may continue to retain it for specific legitimate business reasons. For instance, if you have opted out of our marketing communications, we will keep minimal information about you to ensure we honor your opt-out request.
                <div className="PrivacyPolicy_divider__7q4hL"></div>
                Additionally, we may retain your personal information to fulfill legal requirements or protect and exercise our legal rights. The duration of retention for your personal information will depend on the purposes for which it is needed.
              </p>
            </div>
            <div className="PrivacyPolicy_section__HSTzJ">
              <h4>10. Data Subject Rights</h4>
              <p>
                At IQ Hub, we respect your rights regarding your personal information. You have the right to access, rectify, delete, or restrict the processing of your personal information. To exercise these rights or for privacy-related inquiries, please contact us at
                <a href="mailto:info@iq-hub.com"> info@iq-hub.com</a>
                . You can also manage your marketing and email communication preferences at any time, either by contacting us or using the options provided in our communications.
                <div className="PrivacyPolicy_divider__7q4hL"></div>
                We are committed to assisting you in safeguarding your data protection rights and ensuring your information is accurate and secure.
              </p>
            </div>
            <div className="PrivacyPolicy_section__HSTzJ">
              <h4>11. Cookies and Tracking Technologies</h4>
              <p>
                We use cookies and tracking technologies to enhance your online experience and provide you with personalized content. These technologies serve various purposes, such as analyzing website traffic, improving website functionality, and offering relevant information. For a comprehensive understanding of how cookies and tracking technologies are utilized and their impact on your privacy, we recommend referring to our dedicated Cookie Policy.
                <div className="PrivacyPolicy_divider__7q4hL"></div>
                This policy outlines the types of cookies and tracking technologies we use, their specific functions, and how you can manage your preferences related to them. Your privacy is important to us, and we are committed to transparency regarding our use of these technologies to ensure you have control over your online experience.
              </p>
            </div>
            <div className="PrivacyPolicy_section__HSTzJ">
              <h4>12. International Data Transfers</h4>
              <p>Given the global scope of our operations and the technology involved, it's important to note that personal information may be accessed from various locations worldwide. Some of these locations may have data protection laws that are not as extensive or stringent as those in regions where you operate. While we take measures to safeguard your data during these transfers, we cannot guarantee the same level of protection in jurisdictions with differing data protection standards.</p>
            </div>
            <div className="PrivacyPolicy_section__HSTzJ">
              <h4>13. Third-party links</h4>
              <p>This website may include links to other websites for your convenience. Please be aware that we are not responsible for the privacy practices of these external websites, and we disclaim any liability in connection with their content. We strongly advise you to review the privacy policy of each third-party site linked from this website to understand how they may use your personal information.</p>
            </div>
            <div className="PrivacyPolicy_section__HSTzJ">
              <h4>14. Sharing with Third Parties and Organizations</h4>
              <p>
                We may share personal information with trusted partners and organizations for specific purposes, ensuring compliance with local data protection laws and obtaining your necessary permissions. In order to provide our products and services and manage our operations, we may share your personal information with various third parties and partner organizations. These entities may include IT and marketing technology host suppliers, web and data hosting providers, mailing houses, ad servers, logistics and general services contractors, debt collection agencies, onsite health and safety partners, event registration partners, sales platform providers, communication tool providers, stand designers/builders/fitters, suppliers of sponsorship/marketing/PR collateral, and other event collaboration partners. Personal information will only be shared with these parties to the extent required for them to provide our products and services to you.
                <div className="PrivacyPolicy_divider__7q4hL"></div>
                We use web chat services, including but is not limited to, Intercom, ZenDesk, LiveChat, and Bold360, to connect with you and provide quick responses to sales and customer service inquiries. While we ensure that these service providers protect your data, please note that these chats are intended for basic service-related questions only, and you should avoid sharing sensitive information such as bank or credit card details during these chats. These data processors are contractually obligated to comply with data protection regulations and safeguard the personal information you've shared with us.
                <div className="PrivacyPolicy_divider__7q4hL"></div>
                If you use one of our virtual products, such as a virtual exhibition, directory site, or webinar, or choose to allow your badge to be scanned at an event, we may pass on the information you provide to third parties and partner organizations. This typically occurs when you, as the user, visit or interact with a third party, such as by visiting a stand at an online exhibition, having your badge scanned, or clicking on content provided by a third party. In some cases, such as on a product listing site, you may directly contact a supplier or exhibitor, who may subsequently contact you. In other cases, our virtual products may be sponsored, and in such instances, the data provided will be shared with the sponsor. We will generally inform you at the time of data collection if a product is sponsored.
              </p>
            </div>
            <div className="PrivacyPolicy_section__HSTzJ">
              <h4>15. Changes to Our Business</h4>
              <p>If we become involved in negotiations for the sale of all or part of our business to a third party, are acquired by a third party, or undergo a reorganization, it may be necessary to transfer some or all of your personal information to the relevant third party or its advisors as part of any due diligence process. Any information transferred to the reorganized entity or third party will be used for the same purposes outlined in this policy or for analyzing any proposed sale or reorganization.</p>
            </div>
            <div className="PrivacyPolicy_section__HSTzJ">
              <h4>16. US Appendix</h4>
              <p>This Appendix applies when the data controller you are dealing with is in the US or when a data controller outside the US provides services to you or targets you if you live in the US. Different states in the US may have specific privacy laws that grant you certain rights regarding your personal information. Below, we outline your rights as a consumer in different scenarios.</p>
            </div>
            <div className="PrivacyPolicy_section__HSTzJ">
              <h5>All States Except California:</h5>
              <p>In some states, you have certain rights regarding your personal information, including the right to delete, opt-out, access, and the right to not be discriminated against.</p>
            </div>
            <div className="PrivacyPolicy_section__HSTzJ">
              <h5>California:</h5>
              <p>In California, where Californian privacy laws apply (if you are a consumer resident in California and where the data controller meets the relevant threshold tests), the following additional provisions apply:</p>
            </div>
            <div className="PrivacyPolicy_section__HSTzJ">
              <h5>What Information Do We Collect:</h5>
              <p>The information we collect is detailed in the main body of the Privacy Policy. We provide additional information below in accordance with Californian privacy requirements.</p>
            </div>
            <div className="PrivacyPolicy_section__HSTzJ">
              <h5>How We Share Your Personal Information:</h5>
              <p>
                The way we share your personal information is explained in the main body of the Privacy Policy. We provide additional details below in accordance with Californian privacy requirements:
                <div className="PrivacyPolicy_divider__7q4hL"></div>
                The categories of personal information that we used, transferred, exchanged, or disclosed (including to third parties as described in the "Who do we share your personal information with" section of the Privacy Policy) about consumers during the preceding 12 months were: (a) identifiers; (b) personal information; (c) classification data; (d) commercial information; (e) internet activity; (f) geolocation data; and (g) inferences.
                <div className="PrivacyPolicy_divider__7q4hL"></div>
                The categories of personal information that we disclosed about consumers for a business purpose (including securing our network and websites, conducting audits related to our interactions with you, debugging the site and service, performing services on behalf of ourselves, including servicing your account, and providing customer service as described in the "How and why we use personal information" section of the Privacy Policy) during the preceding 12 months were: (a) identifiers; (b) personal information; (c) classification data; (d) commercial information; (e) internet activity; (f) geolocation data; and (g) inferences.
              </p>
            </div>
            <div className="PrivacyPolicy_section__HSTzJ">
              <h5>Tracking:</h5>
              <p>Please note that Do Not Track disclosures are covered in the main body of the privacy policy. For information on how we and our partners use cookies and online tracking technologies when you visit our sites, please refer to our Cookie Policy link at the bottom of the website.</p>
            </div>
            <div className="PrivacyPolicy_section__HSTzJ">
              <h5>Your Rights as a California Resident:</h5>
              <p>As a California resident, you have the right:</p>
              <ul>
                <li>
                  To request access to the personal information we have about you.
                </li>
                <li>
                  To request that we delete personal information about you.
                </li>
                <li>
                  To opt-out of our use, transfer, exchange, or disclosure (including to third parties) of personal information about you.
                </li>
                <li>
                  Not to be discriminated against based upon whether you decide to opt-out.
                </li>
              </ul>
              <p style={{ marginTop: "20px" }}>
                To exercise these rights, please email your request to
                <a href="mailto:info@iq-hub.com"> info@iq-hub.com</a>
                . For your protection, any request sent to IQ Hub will be subject to a verification procedure requiring you to provide sufficient information that allows us to reasonably identify you as the person about whom we collected personal information, including details of products/services you have previously taken with us. We may also ask for evidence that you are a California resident (e.g., utility bill). We reserve the right to deny your request if we cannot verify your identity. If we deny your request, we will inform you of the denial, provide an explanation, and state the reasons for the denial.
                <div className="PrivacyPolicy_divider__7q4hL"></div>
                You also have the right to direct IQ Hub to not sell your information. To exercise this right to opt-out of the sale of personal information, please email
                <a href="mailto:info@iq-hub.com"> info@iq-hub.com</a>
                .
                <div className="PrivacyPolicy_divider__7q4hL"></div>
                IQ Hub shall not discriminate against you for exercising any of your above rights. Please note that we will continue to communicate with you directly and send you information about your product/service and promotional materials that may be relevant to you. You may designate an authorized agent to make a request to exercise your rights on your behalf. Your authorized agent must be able to provide proof that you have authorized them to act on your behalf. For your protection, we reserve the right to deny any request from an agent who does not submit proof of authorization.
                <div className="PrivacyPolicy_divider__7q4hL"></div>
                We endeavor to respond to a verifiable consumer request within ninty (90) days of its receipt. We do not charge a fee to process or respond to your verifiable consumer request unless it is excessive, repetitive, or manifestly unfounded. If we determine that the request warrants a fee, we will explain why and provide a cost estimate before completing your request.
              </p>
            </div>
            <div className="PrivacyPolicy_section__HSTzJ">
              <h5>17. Contact Information</h5>
              <p>
                For privacy-related questions or concerns, contact our Group Data Protection Officer at
                <a href="mailto:info@iq-hub.com"> info@iq-hub.com</a>
                .
              </p>
            </div>
            <div className="PrivacyPolicy_section__HSTzJ">
              <h5>18. Changes to This Privacy Policy</h5>
              <p>
                We may revise this Privacy Policy to stay compliant with evolving laws and best practices. Any updates will be posted on this website, so please check back periodically for changes.
                <div className="PrivacyPolicy_divider__7q4hL"></div>
                Thank you for entrusting us with your personal information. Your privacy is important to us, and we are committed to protecting it.
                <div className="PrivacyPolicy_divider__7q4hL"></div>
                <i>Privacy Officer at IQ International Pte. Ltd, 8 Marina View, #43-01 Asia Square Tower 1, Singapore, 018960.</i>
                <div className="PrivacyPolicy_divider__7q4hL"></div>
                <i>This Privacy Policy was last updated on 01/01/2024</i>
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default PrivacyPolicy;
