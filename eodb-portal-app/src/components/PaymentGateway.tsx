import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  Wallet, 
  CheckCircle2, 
  AlertCircle,
  Lock,
  Shield,
  Info
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface PaymentGatewayProps {
  amount: number;
  onSuccess: (paymentData: any) => void;
  language?: 'en' | 'hi';
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: any;
  description: string;
  processingFee?: string;
}

export function PaymentGateway({ 
  amount, 
  onSuccess, 
  language = 'en'
}: PaymentGatewayProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const translations = {
    en: {
      securePayment: 'Secure Payment',
      amountToPay: 'Amount to Pay',
      choosePaymentMethod: 'Choose Payment Method',
      creditDebitCard: 'Credit/Debit Card',
      visaMastercard: 'Visa, Mastercard, RuPay accepted',
      upiPayment: 'UPI Payment',
      payUsingUPI: 'Pay using Google Pay, PhonePe, Paytm',
      netBanking: 'Net Banking',
      allMajorBanks: 'All major banks supported',
      digitalWallet: 'Digital Wallet',
      paytmAmazonPay: 'Paytm, Amazon Pay, MobiKwik',
      cardNumber: 'Card Number',
      expiryDate: 'Expiry Date',
      cardholderName: 'Cardholder Name',
      upiId: 'UPI ID',
      selectYourBank: 'Select Your Bank',
      chooseYourBank: 'Choose your bank',
      bankRedirectNotice: 'You will be redirected to your bank\'s secure login page to complete the payment.',
      selectWallet: 'Select Wallet',
      chooseYourWallet: 'Choose your wallet',
      securityNotice: 'Your payment information is encrypted and secure. We use industry-standard security measures to protect your data.',
      processingPayment: 'Processing Payment...',
      payAmount: 'Pay ₹',
      securedByRazorpay: 'Secured by Razorpay • PCI DSS Compliant',
      paymentSuccessful: 'Payment Successful!',
      paymentProcessed: 'Your payment of ₹{amount} has been processed successfully.',
      transactionId: 'Transaction ID',
      paymentFailed: 'Payment Failed',
      paymentIssue: 'There was an issue processing your payment. Please try again.',
      tryAgain: 'Try Again',
      free: 'Free'
    },
    hi: {
      securePayment: 'सुरक्षित भुगतान',
      amountToPay: 'भुगतान राशि',
      choosePaymentMethod: 'भुगतान विधि चुनें',
      creditDebitCard: 'क्रेडिट/डेबिट कार्ड',
      visaMastercard: 'वीज़ा, मास्टरकार्ड, रुपे स्वीकार्य',
      upiPayment: 'UPI भुगतान',
      payUsingUPI: 'Google Pay, PhonePe, Paytm का उपयोग करके भुगतान करें',
      netBanking: 'नेट बैंकिंग',
      allMajorBanks: 'सभी प्रमुख बैंक समर्थित',
      digitalWallet: 'डिजिटल वॉलेट',
      paytmAmazonPay: 'Paytm, Amazon Pay, MobiKwik',
      cardNumber: 'कार्ड नंबर',
      expiryDate: 'समाप्ति दिनांक',
      cardholderName: 'कार्डधारक का नाम',
      upiId: 'UPI ID',
      selectYourBank: 'अपना बैंक चुनें',
      chooseYourBank: 'अपना बैंक चुनें',
      bankRedirectNotice: 'भुगतान पूरा करने के लिए आपको अपने बैंक के सुरक्षित लॉगिन पेज पर भेजा जाएगा।',
      selectWallet: 'वॉलेट चुनें',
      chooseYourWallet: 'अपना वॉलेट चुनें',
      securityNotice: 'आपकी भुगतान जानकारी एन्क्रिप्टेड और सुरक्षित है। हम आपके डेटा की सुरक्षा के लिए उद्योग-मानक सुरक्षा उपायों का उपयोग करते हैं।',
      processingPayment: 'भुगतान प्रसंस्करण...',
      payAmount: '₹ भुगतान करें',
      securedByRazorpay: 'Razorpay द्वारा सुरक्षित • PCI DSS अनुपालित',
      paymentSuccessful: 'भुगतान सफल!',
      paymentProcessed: 'आपका ₹{amount} का भुगतान सफलतापूर्वक प्रसंस्करित हो गया है।',
      transactionId: 'लेनदेन आईडी',
      paymentFailed: 'भुगतान असफल',
      paymentIssue: 'आपके भुगतान को प्रसंस्करित करने में समस्या थी। कृपया पुनः प्रयास करें।',
      tryAgain: 'पुनः प्रयास करें',
      free: 'निःशुल्क'
    }
  };

  const t = translations[language];

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card',
      name: t.creditDebitCard,
      icon: CreditCard,
      description: t.visaMastercard,
      processingFee: t.free
    },
    {
      id: 'upi',
      name: t.upiPayment,
      icon: Smartphone,
      description: t.payUsingUPI,
      processingFee: t.free
    },
    {
      id: 'netbanking',
      name: t.netBanking,
      icon: Building2,
      description: t.allMajorBanks,
      processingFee: t.free
    },
    {
      id: 'wallet',
      name: t.digitalWallet,
      icon: Wallet,
      description: t.paytmAmazonPay,
      processingFee: '1.5%'
    }
  ];

  const banks = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Punjab National Bank',
    'Bank of Baroda',
    'Canara Bank',
    'Union Bank of India'
  ];

  const walletOptions = [
    'Paytm Wallet',
    'Amazon Pay',
    'MobiKwik',
    'Freecharge',
    'Airtel Money'
  ];

  // Demo user details for payment display
  const demoUserDetails = {
    name: language === 'hi' ? 'डेमो उपयोगकर्ता' : 'Demo User',
    email: 'demo@eodb.gov.in',
    phone: '+91 9876543210'
  };

  const handleCardInputChange = (field: string, value: string) => {
    setCardDetails(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const simulatePayment = async () => {
    setIsProcessing(true);
    setPaymentStatus('processing');

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate successful payment
      const paymentData = {
        paymentId: `pay_${Date.now()}`,
        orderId: `ord_${Date.now()}`,
        amount: amount,
        method: selectedMethod,
        status: 'success',
        timestamp: new Date().toISOString(),
        razorpayPaymentId: `rzp_${Date.now()}`,
        razorpaySignature: `sig_${Date.now()}`
      };

      setPaymentStatus('success');
      onSuccess(paymentData);
    } catch (error) {
      setPaymentStatus('failed');
      console.error('Payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">{t.cardNumber}</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.cardNumber}
                onChange={(e) => handleCardInputChange('cardNumber', formatCardNumber(e.target.value))}
                maxLength={19}
                className="mt-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">{t.expiryDate}</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={cardDetails.expiryDate}
                  onChange={(e) => handleCardInputChange('expiryDate', formatExpiryDate(e.target.value))}
                  maxLength={5}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) => handleCardInputChange('cvv', e.target.value.replace(/\D/g, '').substring(0, 3))}
                  maxLength={3}
                  className="mt-2"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="cardholderName">{t.cardholderName}</Label>
              <Input
                id="cardholderName"
                placeholder={language === 'hi' ? 'कार्ड पर अंकित नाम' : 'Name as on card'}
                value={cardDetails.cardholderName}
                onChange={(e) => handleCardInputChange('cardholderName', e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        );

      case 'upi':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="upiId">{t.upiId}</Label>
              <Input
                id="upiId"
                placeholder="yourname@paytm / yourname@gpay"
                className="mt-2"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full mb-1"></div>
                <span className="text-xs">Google Pay</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                <div className="w-8 h-8 bg-purple-600 rounded-full mb-1"></div>
                <span className="text-xs">PhonePe</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full mb-1"></div>
                <span className="text-xs">Paytm</span>
              </Button>
            </div>
          </div>
        );

      case 'netbanking':
        return (
          <div className="space-y-4">
            <div>
              <Label>{t.selectYourBank}</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder={t.chooseYourBank} />
                </SelectTrigger>
                <SelectContent>
                  {banks.map((bank) => (
                    <SelectItem key={bank} value={bank.toLowerCase().replace(/\s+/g, '_')}>
                      {bank}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                {t.bankRedirectNotice}
              </AlertDescription>
            </Alert>
          </div>
        );

      case 'wallet':
        return (
          <div className="space-y-4">
            <div>
              <Label>{t.selectWallet}</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder={t.chooseYourWallet} />
                </SelectTrigger>
                <SelectContent>
                  {walletOptions.map((wallet) => (
                    <SelectItem key={wallet} value={wallet.toLowerCase().replace(/\s+/g, '_')}>
                      {wallet}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (paymentStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-green-600 mb-2">{t.paymentSuccessful}</h3>
        <p className="text-muted-foreground mb-4">
          {t.paymentProcessed.replace('{amount}', amount.toString())}
        </p>
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-sm">
          <p><strong>{t.transactionId}:</strong> TXN{Date.now()}</p>
          <p><strong>{language === 'hi' ? 'राशि' : 'Amount'}:</strong> ₹{amount}</p>
          <p><strong>{language === 'hi' ? 'स्थिति' : 'Status'}:</strong> {language === 'hi' ? 'पूर्ण' : 'Completed'}</p>
        </div>
      </motion.div>
    );
  }

  if (paymentStatus === 'failed') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8"
      >
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-xl font-bold text-red-600 mb-2">{t.paymentFailed}</h3>
        <p className="text-muted-foreground mb-4">
          {t.paymentIssue}
        </p>
        <Button onClick={() => {
          setPaymentStatus('idle');
          setIsProcessing(false);
        }}>
          {t.tryAgain}
        </Button>
      </motion.div>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-blue-600" />
          <span>{t.securePayment}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Payment Amount */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">{t.amountToPay}</p>
          <p className="text-2xl font-bold">₹{amount}</p>
        </div>

        {/* User Details */}
        <div className="space-y-2 text-sm">
          <p><span className="text-muted-foreground">{language === 'hi' ? 'नाम' : 'Name'}:</span> {demoUserDetails.name}</p>
          <p><span className="text-muted-foreground">{language === 'hi' ? 'ईमेल' : 'Email'}:</span> {demoUserDetails.email}</p>
          <p><span className="text-muted-foreground">{language === 'hi' ? 'फोन' : 'Phone'}:</span> {demoUserDetails.phone}</p>
        </div>

        {/* Payment Methods */}
        <div>
          <Label className="text-base">{t.choosePaymentMethod}</Label>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {paymentMethods.map((method) => (
              <motion.button
                key={method.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedMethod(method.id)}
                className={`p-3 border rounded-lg text-left transition-all ${
                  selectedMethod === method.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-border hover:border-blue-300'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <method.icon className="w-4 h-4" />
                  <span className="font-medium text-sm">{method.name}</span>
                </div>
                <p className="text-xs text-muted-foreground">{method.description}</p>
                {method.processingFee && (
                  <Badge variant="secondary" className="text-xs mt-1">
                    {method.processingFee}
                  </Badge>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Payment Form */}
        <div className="space-y-4">
          {renderPaymentForm()}
        </div>

        {/* Security Notice */}
        <Alert>
          <Lock className="h-4 w-4" />
          <AlertDescription className="text-xs">
            {t.securityNotice}
          </AlertDescription>
        </Alert>

        {/* Payment Button */}
        <Button
          onClick={simulatePayment}
          disabled={isProcessing || paymentStatus === 'processing'}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          size="lg"
        >
          {isProcessing ? (
            <>
              <motion.div
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              {t.processingPayment}
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 mr-2" />
              {t.payAmount}{amount}
            </>
          )}
        </Button>

        {/* Powered by Razorpay */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            {t.securedByRazorpay}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}