export default function RefundPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Refund Policy</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-sm text-gray-500 mb-8">
              Last updated: February 14, 2026
            </p>

            <h2>1. Digital Products Policy</h2>
            <p>
              All products sold through the OpenClaw Marketplace are digital downloads. Due to the 
              instant delivery nature of digital products, <strong>all sales are generally final</strong>.
            </p>

            <h2>2. Eligible Refund Circumstances</h2>
            <p>
              We may provide refunds in the following circumstances, at our sole discretion:
            </p>

            <h3>Technical Defects</h3>
            <ul>
              <li>The skill file is corrupted or cannot be downloaded</li>
              <li>The skill contains fundamental errors that prevent it from functioning as described</li>
              <li>Missing essential files or documentation that prevent proper installation</li>
            </ul>

            <h3>Billing Errors</h3>
            <ul>
              <li>Duplicate charges for the same product</li>
              <li>Incorrect billing amounts due to system errors</li>
              <li>Unauthorized transactions (subject to verification and investigation)</li>
            </ul>

            <h3>Misrepresentation</h3>
            <ul>
              <li>The product delivered is substantially different from what was advertised</li>
              <li>False or misleading compatibility claims</li>
            </ul>

            <h2>3. Non-Eligible Circumstances</h2>
            <p>
              Refunds will <strong>not</strong> be provided for:
            </p>
            <ul>
              <li>Change of mind or buyer's remorse</li>
              <li>Compatibility issues with your specific setup (when requirements are clearly stated)</li>
              <li>Difficulty in installation or configuration (support is available)</li>
              <li>Performance issues due to hardware limitations or network connectivity</li>
              <li>Products that have been successfully downloaded and accessed</li>
              <li>Failure to read product descriptions or system requirements</li>
            </ul>

            <h2>4. Refund Request Process</h2>
            <p>
              To request a refund, you must:
            </p>
            <ol>
              <li><strong>Submit within 30 days</strong> of purchase</li>
              <li><strong>Contact Support:</strong> Email us through the contact information on our website</li>
              <li><strong>Provide Details:</strong> Include your order number, email address, and detailed reason for the refund request</li>
              <li><strong>Provide Evidence:</strong> For technical issues, include screenshots, error messages, or other relevant documentation</li>
            </ol>

            <h2>5. Refund Processing</h2>
            <p>
              If your refund is approved:
            </p>
            <ul>
              <li>We will process the refund within 5-10 business days</li>
              <li>Refunds will be issued to the original payment method</li>
              <li>You may lose access to the digital product and associated support</li>
              <li>Bank processing times may vary (typically 3-7 business days)</li>
            </ul>

            <h2>6. Partial Refunds</h2>
            <p>
              In some cases, we may offer partial refunds for:
            </p>
            <ul>
              <li>Products with minor issues that don't prevent core functionality</li>
              <li>Bundles where only some components have issues</li>
              <li>Situations where a full refund is not warranted but some compensation is appropriate</li>
            </ul>

            <h2>7. Alternative Resolutions</h2>
            <p>
              Before requesting a refund, consider these alternatives:
            </p>
            <ul>
              <li><strong>Customer Support:</strong> Our team can help resolve technical issues</li>
              <li><strong>Product Updates:</strong> We regularly update skills to fix issues and add features</li>
              <li><strong>Exchange:</strong> In some cases, we may offer to exchange for a different product</li>
            </ul>

            <h2>8. Fraudulent Activity</h2>
            <p>
              We reserve the right to:
            </p>
            <ul>
              <li>Investigate suspicious refund requests</li>
              <li>Deny refunds for fraudulent or abusive claims</li>
              <li>Terminate accounts that repeatedly request unwarranted refunds</li>
              <li>Report fraudulent activity to relevant authorities</li>
            </ul>

            <h2>9. Dispute Resolution</h2>
            <p>
              If you disagree with our refund decision, you may:
            </p>
            <ul>
              <li>Request a review by escalating through our customer support team</li>
              <li>Dispute the charge with your payment provider (Stripe)</li>
              <li>Seek resolution through appropriate legal channels</li>
            </ul>

            <h2>10. Policy Changes</h2>
            <p>
              We may update this refund policy at any time. Changes will be posted on this page 
              with an updated revision date. Continued use of our service after changes indicates 
              acceptance of the new policy.
            </p>

            <h2>11. Contact Information</h2>
            <p>
              For refund requests or questions about this policy, please contact us through the 
              support channels available on our website. Include as much detail as possible to 
              help us process your request efficiently.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">💡 Before Purchasing</h3>
              <p className="text-blue-700">
                We strongly recommend reading product descriptions, system requirements, and 
                compatibility information carefully before making a purchase. This helps ensure 
                the product meets your needs and reduces the likelihood of needing a refund.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}