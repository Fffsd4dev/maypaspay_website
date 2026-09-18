import { Link } from "react-router-dom";

export default function DisclaimerSection() {
  return (
    <>
        <div className="section-spacing-lg">
            <div className="container">
                <article className="prose-content prose mx-auto prose-headings:my-0 prose-h5:pt-10 prose-p:my-0 prose-p:pt-4 prose-p:leading-normal prose-headings:leading-[1.4] prose-h5:text-xl md:prose-h5:text-2xl prose-p:text-[17px] md:prose-p:text-lg prose-li:text-base md:prose-li:text-lg prose-p:text-paragraph_black prose-li:text-paragraph_black prose-headings:text-title_black prose-img:rounded-2xl prose-img:object-cover prose-code:text-paragraph_black prose-a:text-[#0080FF] prose-ul:pt-4 prose-ol:pt-4 prose-ul:my-0 prose-ol:my-0 prose-li:my-0 prose-ul:flex prose-ul:flex-col prose-ul:gap-1 prose-ol:flex prose-ol:flex-col prose-ol:gap-1 prose-strong:font-semibold prose-em:prose-a:text-paragraph_black! prose-em:prose-a:font-primary! prose-em:not-italic">
                    <h2 className="hidden">For SEO</h2>
                    <h3 className="hidden">For SEO</h3>
                    <h4 className="hidden">For SEO</h4>
                    <p>Welcome to SecureVest! These Terms of Service govern your access and use of the SecureVest mobile application, website, and any other products or services provided by SecureVest Inc. By downloading, accessing, or using SecureVest, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these terms, please do not use SecureVest.
                    </p>
                    <h5>Account Registration</h5>
                    <p>To use certain SecureVest services, you must create an account and provide accurate personal or professional information. You are entirely responsible for maintaining the confidentiality of your account credentials and restricting unauthorized access to your devices. SecureVest accounts are non-transferrable. You must promptly notify SecureVest of any unauthorized use or security breach related to your account.</p>
                    <h5>License Restrictions</h5>
                    <p>SecureVest grants you a limited, non-exclusive, revocable license to use the application and services for your personal or internal business use only. This license is conditional upon your adherence to these Terms. You may not copy, modify, distribute, sell, or lease any part of our services or included software, nor may you reverse engineer or attempt to extract the source code of our technology without explicit written permission from SecureVest.</p>
                    <h5>User Responsibilities</h5>
                    <p>You are solely responsible for your use of SecureVest services in compliance with these Terms and all applicable international, national, state, and local laws and regulations, particularly those related to healthcare data privacy (such as HIPAA, GDPR, or similar standards). You agree not to use our services to violate intellectual property rights, engage in illegal activities, transmit harmful content, or introduce viruses or malware into the SecureVest system.</p>
                    <h5>Third-Party Integration</h5>
                    <p>SecureVest integrates with various third-party service providers, including financial institutions, Electronic Health Record (EHR) systems, and specialized medical databases, to facilitate account linking, transaction data access, data aggregation, and payment processing. You grant SecureVest permission to access and utilize this data strictly through secured connections per the respective third-party institution's terms and privacy policies, solely for the purpose of delivering the contracted SecureVest services.</p>
                    <h5>Account Security</h5>
                    <p>You are responsible for keeping your login credentials secure and promptly notifying us immediately of any unauthorized use or compromise of your account. SecureVest employs industry-standard security protocols but will not be liable for any losses arising from account compromise due to your failure to maintain adequate security or due to actions taken under your credentials.</p>
                    <h5>User Content</h5>
                    <p>Any feedback, comments, clinical observations, or ideas you provide about SecureVest become the exclusive property of SecureVest, and you relinquish any and all intellectual property rights over them upon submission. We have no obligation to review user content for clinical or technical accuracy and make no representation or warranty regarding the reliability of user-provided information.</p>
                    <h5>Paid Services Fees</h5>
                    <p>Certain premium SecureVest features, subscriptions, or professional services require payment of fees, which will be clearly disclosed to you prior to purchase. You agree to pay all applicable fees and taxes associated with your use. SecureVest reserves the right to adjust pricing and billing methods at any time, provided that reasonable notice is given for any substantial changes to recurring fees.</p>
                    <ul>
                        <li>Felis ut ultricies lacinia.</li>
                        <li>Mauris nec eros at ex luctus.</li>
                        <li>Suspendisse fringilla.</li>
                        <li>Lacinia porta vel eget erat.</li>
                    </ul>
                    <ol>
                        <li>Suspendisse fringilla. You can call
                            <strong>John</strong>
                            but not
                            <strong>Jhon.</strong>
                        </li>
                        <li>Felis ut ultricies lacinia.</li>
                        <li>Felis ut ultricies lacinia.
                            <Link to="https://shreethemes.in/" target="_blank">website</Link>
                        </li>
                    </ol>
                    <h5>Third-Party Links Content</h5>
                    <p>SecureVest services may contain links to, or content from, third parties that are provided for convenience and reference only. We do not endorse, sponsor, or warrant the accuracy or safety of any third-party content, products, or services accessed through our platform, and we are not responsible for their compliance or liabilities.</p>
                    <h5>Termination</h5>
                    <p>We may suspend or permanently terminate your SecureVest account and access immediately if we believe you have violated these Terms, engaged in fraudulent activity, or compromised the security of the platform. Upon termination, any licenses granted by SecureVest will immediately cease, and you must discontinue all use of the services. All accrued liabilities prior to termination shall survive.</p>
                    <h5>Disclaimers Limitations</h5>
                    <p>SecureVest services are provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied. We specifically disclaim all liability, including but not limited to, warranties of merchantability, fitness for a particular purpose, and non-infringement. SecureVest is not responsible for any direct, indirect, incidental, punitive, or consequential damages related to your use or inability to use the services, even if SecureVest has been advised of the possibility of such damages.</p>
                    <h5>Governing Law</h5>
                    <p>These Terms shall be governed by and construed under the laws of United Arab Emirates. Any dispute arising out of or relating to these Terms will be subject to binding arbitration conducted in accordance with the rules of SecureVest LLC, unless otherwise agreed upon in writing.</p>
                    <h5>Modifications</h5>
                    <p>SecureVest reserves the unilateral right to modify these Terms at any time by posting the updated version, which will be effective immediately upon posting. We encourage you to review the Terms periodically. By continuing to use SecureVest after any changes have been made and posted, you expressly accept the revised Terms of Service.</p>
                    <p>By continuing to use SecureVest after any changes, you accept the revised Terms of Service.</p>
                    <h5>Contact Us</h5>
                    <p>For any questions, concerns, or inquiries about these Terms of Services, please contact our legal team at:
                        <em>
                            <Link to="mailto:terms@SecureVest.com">terms@SecureVest.com.</Link>
                        </em>
                    </p>
                    <p>This covers key elements like account registration, license terms, user conduct, third-party integration, security, fees, disclaimers, governing laws and the right for SecureVest to modify the terms as needed. Please review carefully with your legal team and modify as necessary. Let me know if any sections need clarification or expansion.</p>
                </article>
            </div>
        </div>
    </>
  )
}
