const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_SECRET_KEY;

import React, { useState, useEffect } from 'react';
import { FaCreditCard, FaLock, FaCheckCircle, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Payment() {
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Load Paystack script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    if (!amount || !email || !name || !phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (parseFloat(amount) < 50) {
      toast.error('Minimum payment amount is ₦50');
      return;
    }

    setIsLoading(true);

    const handler = window.PaystackPop.setup({
      key: `pk_test_2915ea220808152453d34c4c827ebc50dd402148`,
      email: email,
      amount: parseFloat(amount) * 100, // Amount in kobo
      currency: 'NGN',
      ref: `smartroute_${Date.now()}`,
      metadata: {
        custom_fields: [
          {
            display_name: 'Full Name',
            variable_name: 'full_name',
            value: name,
          },
          {
            display_name: 'Phone Number',
            variable_name: 'phone_number',
            value: phone,
          },
        ],
      },
      callback: function (response) {
        setIsLoading(false);
        setPaymentSuccess(true);
        toast.success(`Payment successful! Reference: ${response.reference}`);
        console.log('Payment successful:', response);

        // You can send this reference to your backend for verification
        // verifyPayment(response.reference)

        // Reset form after successful payment
        setTimeout(() => {
          setAmount('');
          setEmail('');
          setName('');
          setPhone('');
          setPaymentSuccess(false);
        }, 3000);
      },
      onClose: function () {
        setIsLoading(false);
        toast.error('Payment cancelled');
      },
    });

    handler.openIframe();
  };

  const resetForm = () => {
    setAmount('');
    setEmail('');
    setName('');
    setPhone('');
    setPaymentSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-md">
          <div className="overflow-hidden rounded-lg bg-white shadow-lg">
            {/* Header */}
            <div className="bg-[#004225] px-6 py-4 text-white">
              <div className="flex items-center gap-3">
                <FaCreditCard className="text-xl" />
                <div>
                  <h2 className="text-xl font-semibold">SmartRoute Payment</h2>
                  <p className="text-sm opacity-90">Secure payment gateway</p>
                </div>
              </div>
            </div>

            {/* Success Message */}
            {paymentSuccess && (
              <div className="m-6 border-l-4 border-green-400 bg-green-50 p-4">
                <div className="flex items-center">
                  <FaCheckCircle className="mr-3 text-green-400" />
                  <div>
                    <h3 className="font-medium text-green-800">
                      Payment Successful!
                    </h3>
                    <p className="text-sm text-green-700">
                      Your transaction has been completed successfully.
                    </p>
                  </div>
                </div>
                <button
                  onClick={resetForm}
                  className="mt-3 text-sm font-medium text-green-600 hover:text-green-800"
                >
                  Make Another Payment
                </button>
              </div>
            )}

            {/* Payment Form */}
            {!paymentSuccess && (
              <div className="px-6 py-6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handlePayment();
                  }}
                >
                  <div className="space-y-4">
                    {/* Amount */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Amount (₦) *
                      </label>
                      <input
                        type="number"
                        min="50"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-[#004225]"
                        placeholder="Enter amount (minimum ₦50)"
                        required
                      />
                    </div>

                    {/* Full Name */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-[#004225]"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-[#004225]"
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-[#004225]"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>

                    {/* Payment Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#004225] px-4 py-3 font-medium text-white transition-colors hover:bg-[#005530] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <FaLock className="text-sm" />
                          Pay ₦{amount || '0.00'}
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Security Notice */}
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <FaLock className="mt-1 flex-shrink-0 text-green-500" />
                    <div>
                      <p className="font-medium">Secure Payment</p>
                      <p>
                        Your payment information is encrypted and secure.
                        Powered by Paystack.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-4 text-center">
                  <p className="mb-2 text-xs text-gray-500">
                    Accepted Payment Methods
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                    <span>Cards</span> • <span>Bank Transfer</span> •{' '}
                    <span>USSD</span> • <span>Mobile Money</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              Need help? Contact support:{' '}
              <a
                href="tel:+2347067060287"
                className="text-[#004225] hover:underline"
              >
                +234 706 706 0287
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
