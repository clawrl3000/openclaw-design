export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-sm text-gray-500 mb-8">
              Last updated: February 14, 2026
            </p>

            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing and using openclaw.design (the "Service"), operated by OpenClaw ("we", "us", or "our"), 
              you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              OpenClaw provides a marketplace for AI agent skills and automation tools. Our Service allows users to:
            </p>
            <ul>
              <li>Browse and purchase digital skills for OpenClaw agents</li>
              <li>Download skill files and documentation</li>
              <li>Access customer support for purchased products</li>
            </ul>

            <h2>3. Digital Products</h2>
            <p>
              All products sold through our marketplace are digital downloads including:
            </p>
            <ul>
              <li>Skill definition files (.skill format)</li>
              <li>Supporting scripts and documentation</li>
              <li>Configuration templates and examples</li>
            </ul>

            <h2>4. Payment and Pricing</h2>
            <p>
              All payments are processed through Stripe. Prices are listed in USD. You agree to pay all charges 
              incurred by your account at the prices in effect when the charges are incurred.
            </p>

            <h2>5. Refunds and Returns</h2>
            <p>
              Due to the nature of digital products, all sales are final. However, we may provide refunds 
              in cases of:
            </p>
            <ul>
              <li>Technical defects that prevent the skill from functioning as described</li>
              <li>Duplicate purchases made in error</li>
              <li>Unauthorized transactions (subject to verification)</li>
            </ul>
            <p>
              Refund requests must be submitted within 30 days of purchase. Contact support at the 
              email address provided on our website.
            </p>

            <h2>6. Intellectual Property</h2>
            <p>
              The skills and content provided through our Service are protected by copyright and other 
              intellectual property laws. You may use purchased skills for your personal or business use 
              but may not redistribute, resell, or share them with others.
            </p>

            <h2>7. User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and 
              for all activities that occur under your account.
            </p>

            <h2>8. Prohibited Uses</h2>
            <p>You may not use our Service:</p>
            <ul>
              <li>For any unlawful purpose or to solicit others to unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations or laws</li>
              <li>To transmit or procure the sending of any advertising or promotional material</li>
              <li>To impersonate or attempt to impersonate the Company, employees, or other users</li>
            </ul>

            <h2>9. Disclaimer</h2>
            <p>
              The information on this website is provided on an "as is" basis. To the fullest extent 
              permitted by law, this Company excludes all representations, warranties, conditions and terms.
            </p>

            <h2>10. Limitation of Liability</h2>
            <p>
              In no event shall OpenClaw or its suppliers be liable for any damages (including, 
              without limitation, damages for loss of data or profit, or due to business interruption) 
              arising out of the use or inability to use the materials on OpenClaw's website.
            </p>

            <h2>11. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of 
              the United States and you irrevocably submit to the exclusive jurisdiction of the courts 
              in that state or location.
            </p>

            <h2>12. Changes to Terms</h2>
            <p>
              We reserve the right to update these terms at any time without notice. Your continued 
              use of the Service after any changes indicates your acceptance of the new terms.
            </p>

            <h2>13. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us through the 
              contact information provided on our website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}