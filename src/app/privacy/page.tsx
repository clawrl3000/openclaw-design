export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-sm text-gray-500 mb-8">
              Last updated: February 14, 2026
            </p>

            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, 
              make a purchase, or contact us for support.
            </p>

            <h3>Information you provide to us:</h3>
            <ul>
              <li>Name and email address (via GitHub OAuth)</li>
              <li>Payment information (processed by Stripe, not stored by us)</li>
              <li>Communications with our support team</li>
            </ul>

            <h3>Information we collect automatically:</h3>
            <ul>
              <li>Usage data and analytics</li>
              <li>Device and browser information</li>
              <li>IP address and general location data</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process transactions and deliver purchased products</li>
              <li>Provide customer support and respond to your requests</li>
              <li>Send important updates about your account or our services</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties except:</p>
            <ul>
              <li><strong>Service Providers:</strong> Stripe for payment processing, GitHub for authentication</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your 
              personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <ul>
              <li>All data transmission is encrypted using HTTPS</li>
              <li>Payment data is handled exclusively by Stripe (PCI DSS compliant)</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication requirements</li>
            </ul>

            <h2>5. Data Retention</h2>
            <p>
              We retain your personal information for as long as your account is active or as needed to 
              provide services. We may retain certain information as required by law or for legitimate 
              business purposes.
            </p>

            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal information we have about you</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Delete your account and associated data</li>
              <li>Export your data in a portable format</li>
              <li>Opt out of marketing communications</li>
            </ul>

            <h2>7. Cookies</h2>
            <p>
              We use cookies and similar technologies to enhance your experience on our website. 
              Cookies help us:
            </p>
            <ul>
              <li>Remember your preferences and settings</li>
              <li>Keep you signed in to your account</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Improve our services and user experience</li>
            </ul>
            <p>
              You can control cookies through your browser settings, but some features of our 
              service may not function properly if cookies are disabled.
            </p>

            <h2>8. Third-Party Services</h2>
            <p>Our service integrates with third-party providers:</p>
            <ul>
              <li><strong>GitHub:</strong> For user authentication and identity verification</li>
              <li><strong>Stripe:</strong> For secure payment processing</li>
              <li><strong>Neon:</strong> For database hosting and management</li>
            </ul>
            <p>
              These services have their own privacy policies governing the use of your information.
            </p>

            <h2>9. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. 
              We ensure appropriate safeguards are in place to protect your information in accordance 
              with this privacy policy.
            </p>

            <h2>10. Children's Privacy</h2>
            <p>
              Our service is not directed to individuals under the age of 13. We do not knowingly 
              collect personal information from children under 13.
            </p>

            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes 
              by posting the new policy on this page and updating the "last updated" date.
            </p>

            <h2>12. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us through the 
              contact information provided on our website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}