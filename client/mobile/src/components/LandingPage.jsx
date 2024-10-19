import React, { useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';


const LandingPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [serviceProvider, setServiceProvider] = useState('');
  const [rechargeSuccess, setRechargeSuccess] = useState(false);

  const GST_RATE = 0.18;



  const isValidPhoneNumber = (number) => {
    const regex = /^\d{10}$/; // Regex to match a 10-digit number
    return regex.test(number);
  };



  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;
    setPhoneNumber(value);
    
    // Reset error message when input changes
    if (value && !isValidPhoneNumber(value)) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
    } else {
      setErrorMessage('');
    }
  };
  


  const generatePDF = async () => {
    if (!phoneNumber || !selectedPlan || !paymentMethod) {
      alert('Please fill all details before generating the PDF.');
      return;
    }

    const doc = new jsPDF();
    const qrData = `Phone Number: ${phoneNumber}\nService Provider: ${serviceProvider}\nPayment Method: ${paymentMethod}`;

    // Function to draw a 3D border
    const draw3DBorder = () => {
        const margin = 10; // Margin for the border
        const borderWidth = 5; // Width of the border
        const outerColor = [100, 100, 100]; // Outer border color (gray)
        const innerColor = [255, 255, 255]; // Inner border color (white)

        // Draw the outer border
        doc.setDrawColor(...outerColor);
        doc.setLineWidth(borderWidth);
        doc.rect(margin, margin, doc.internal.pageSize.width - 2 * margin, doc.internal.pageSize.height - 2 * margin);

        // Draw the inner border
        doc.setDrawColor(...innerColor);
        doc.setLineWidth(borderWidth - 1); // Slightly thinner for the inner border
        doc.rect(margin + 2, margin + 2, doc.internal.pageSize.width - 2 * (margin + 2), doc.internal.pageSize.height - 2 * (margin + 2));
    };

    // Draw the 3D border
    draw3DBorder();

    // Set font and title
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.setTextColor(40);
    doc.text('Recharge Bill', 20, 40);

    // Add a line for separation
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(1);
    doc.line(20, 45, 190, 45); // Draw a line

    // Use a larger font for important information
    doc.setFontSize(14);
    doc.text(`Phone Number: ${phoneNumber}`, 20, 60);
    doc.text(`Service Provider: ${serviceProvider}`, 20, 70);
    doc.text(`Payment Method: ${paymentMethod}`, 20, 80);

    // Add plan details
    doc.setFontSize(12);
    doc.text('Plan Details:', 20, 95);
    doc.text(`- Plan Type: ${selectedPlan.type}`, 30, 105);
    doc.text(`- Validity: ${selectedPlan.validity}`, 30, 115);
    doc.text(`- Data: ${selectedPlan.data}`, 30, 125);
    doc.text(`- Subscriptions: ${selectedPlan.subscriptions.join(', ')}`, 30, 135);
    doc.text(`- Description: ${selectedPlan.description}`, 30, 145);

    // Calculate prices
    const { basePrice, gstAmount, totalAmount } = calculateGST(selectedPlan.price);
    
    // Add pricing details
    doc.setFontSize(14);
    doc.setTextColor(0, 102, 204); // Set color for pricing
    doc.text('Pricing Details:', 20, 165);
    doc.text(`Base Price: ₹${basePrice}`, 30, 175);
    doc.text(`GST (18%): ₹${gstAmount}`, 30, 185);
    doc.text(`Total Amount: ₹${totalAmount}`, 30, 195);

    // Generate QR code and add it to the PDF
    const qrCanvas = document.createElement('canvas');
    await QRCode.toCanvas(qrCanvas, qrData, { errorCorrectionLevel: 'H' }, async (error) => {
        if (error) console.error(error);
        else {
            const qrImageDataUrl = qrCanvas.toDataURL('image/png');
            const imgWidth = 50; // Width of the QR code image
            const imgHeight = 50; // Height of the QR code image
            const xPosition = doc.internal.pageSize.width - imgWidth - 20; // Adjust for positioning
            const yPosition = 60; // Adjust vertical position

            // Add QR code image to PDF
            await doc.addImage(qrImageDataUrl, 'PNG', xPosition, yPosition, imgWidth, imgHeight);
        }

        // Add footer
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text('Thank you for using our service!', 20, 210);
        doc.text('If you have any questions, please contact our support.', 20, 215);

        // Save PDF
        doc.save('recharge-bill.pdf');
    });
};


  // Plans data for different service providers
  const plansByProvider = {
    Jio: [
      { type: 'Prepaid', price: 299, validity: '28 days', data: '1.5GB/day', subscriptions: ['Netflix', 'Amazon Prime'], description: 'Best plan with entertainment subscriptions' },
      { type: 'Postpaid', price: 499, validity: '30 days', data: 'Unlimited', subscriptions: ['Hotstar', 'Spotify'], description: 'Postpaid plan with premium content' },
      { type: 'Prepaid', price: 349, validity: '28 days', data: '2GB/day', subscriptions: ['Disney+ Hotstar'], description: 'Great data plan for streaming' },
      { type: 'Postpaid', price: 599, validity: '30 days', data: 'Unlimited', subscriptions: ['Spotify', 'Amazon Prime'], description: 'Unlimited calling and data for postpaid users' },
      { type: 'Prepaid', price: 199, validity: '21 days', data: '1GB/day', subscriptions: ['YouTube'], description: 'Budget-friendly plan for light users' },
      { type: 'Postpaid', price: 699, validity: '30 days', data: 'Unlimited', subscriptions: ['Netflix', 'Zee5'], description: 'Postpaid plan with multiple streaming services' },
      { type: 'Prepaid', price: 499, validity: '56 days', data: '1.5GB/day', subscriptions: ['Netflix', 'YouTube'], description: 'Long-term plan with entertainment' },
      { type: 'Postpaid', price: 799, validity: '30 days', data: 'Unlimited', subscriptions: ['Amazon Prime', 'Spotify'], description: 'All-in-one plan for heavy users' },
      { type: 'Prepaid', price: 399, validity: '30 days', data: '2GB/day', subscriptions: ['Disney+ Hotstar', 'YouTube'], description: 'Data-rich plan with great subscriptions' },
      { type: 'Postpaid', price: 899, validity: '30 days', data: 'Unlimited', subscriptions: ['Netflix', 'Amazon Prime', 'Spotify'], description: 'Ultimate postpaid plan for media lovers' }
    ],
    Vi: [
      { type: 'Prepaid', price: 299, validity: '28 days', data: '1.5GB/day', subscriptions: ['Vi Movies & TV'], description: 'Best prepaid plan with entertainment' },
      { type: 'Postpaid', price: 499, validity: '30 days', data: 'Unlimited', subscriptions: ['Hotstar', 'Vi Movies'], description: 'Premium postpaid plan' },
      { type: 'Prepaid', price: 349, validity: '28 days', data: '2GB/day', subscriptions: ['Vi Movies & TV'], description: 'Great prepaid data plan' },
      { type: 'Postpaid', price: 599, validity: '30 days', data: 'Unlimited', subscriptions: ['Vi Movies & TV'], description: 'Unlimited data and calling postpaid plan' },
      { type: 'Prepaid', price: 199, validity: '21 days', data: '1GB/day', subscriptions: ['YouTube'], description: 'Affordable prepaid plan' },
      { type: 'Postpaid', price: 699, validity: '30 days', data: 'Unlimited', subscriptions: ['Zee5', 'Vi Movies'], description: 'Postpaid plan with Zee5 subscription' },
      { type: 'Prepaid', price: 499, validity: '56 days', data: '1.5GB/day', subscriptions: ['Vi Movies'], description: 'Long-term prepaid plan' },
      { type: 'Postpaid', price: 799, validity: '30 days', data: 'Unlimited', subscriptions: ['Spotify', 'Vi Movies'], description: 'All-inclusive postpaid plan' },
      { type: 'Prepaid', price: 399, validity: '30 days', data: '2GB/day', subscriptions: ['Vi Movies', 'YouTube'], description: 'Data-heavy prepaid plan' },
      { type: 'Postpaid', price: 899, validity: '30 days', data: 'Unlimited', subscriptions: ['Netflix', 'Spotify'], description: 'Ultimate postpaid media plan' }
    ],
    Airtel: [
      { type: 'Prepaid', price: 249, validity: '28 days', data: '1.5GB/day', subscriptions: ['Airtel Xstream'], description: 'Best Airtel prepaid plan with 1.5GB/day' },
      { type: 'Postpaid', price: 499, validity: '30 days', data: 'Unlimited', subscriptions: ['Amazon Prime', 'Disney+ Hotstar'], description: 'Premium Airtel postpaid plan with unlimited data' },
      { type: 'Prepaid', price: 399, validity: '56 days', data: '1.5GB/day', subscriptions: ['Airtel Xstream'], description: 'Prepaid long-term plan with 1.5GB/day' },
      { type: 'Postpaid', price: 999, validity: '30 days', data: 'Unlimited', subscriptions: ['Netflix', 'Amazon Prime', 'Disney+ Hotstar'], description: 'Ultimate Airtel postpaid plan with top subscriptions' },
      { type: 'Prepaid', price: 199, validity: '24 days', data: '1GB/day', subscriptions: ['Wynk Music'], description: 'Budget prepaid plan with 1GB/day' },
      { type: 'Postpaid', price: 749, validity: '30 days', data: 'Unlimited', subscriptions: ['Wynk Music', 'Airtel Xstream'], description: 'Postpaid plan with unlimited data and entertainment' },
      { type: 'Prepaid', price: 349, validity: '28 days', data: '2GB/day', subscriptions: ['Airtel Xstream'], description: '2GB/day prepaid plan with entertainment subscriptions' },
      { type: 'Postpaid', price: 1599, validity: '30 days', data: 'Unlimited', subscriptions: ['Netflix', 'Prime Video', 'ZEE5'], description: 'Family postpaid plan with premium subscriptions' },
      { type: 'Prepaid', price: 599, validity: '84 days', data: '1.5GB/day', subscriptions: ['Airtel Xstream'], description: 'Long-term prepaid plan for heavy users' },
      { type: 'Postpaid', price: 1299, validity: '30 days', data: 'Unlimited', subscriptions: ['Netflix', 'Amazon Prime'], description: 'High-end postpaid plan for premium users' }
    ],
    
    BSNL: [
      { type: 'Prepaid', price: 149, validity: '28 days', data: '1GB/day', subscriptions: ['BSNL TV'], description: 'Affordable BSNL prepaid plan for light users' },
      { type: 'Postpaid', price: 399, validity: '30 days', data: 'Unlimited', subscriptions: ['BSNL TV'], description: 'BSNL postpaid plan with unlimited data' },
      { type: 'Prepaid', price: 247, validity: '30 days', data: '2GB/day', subscriptions: ['BSNL Tunes'], description: 'Popular prepaid plan with 2GB/day and BSNL Tunes' },
      { type: 'Postpaid', price: 799, validity: '30 days', data: 'Unlimited', subscriptions: ['Amazon Prime'], description: 'Premium postpaid plan with Amazon Prime subscription' },
      { type: 'Prepaid', price: 485, validity: '90 days', data: '1.5GB/day', subscriptions: ['BSNL TV'], description: 'Long-term prepaid plan for consistent data usage' },
      { type: 'Postpaid', price: 499, validity: '30 days', data: 'Unlimited', subscriptions: ['BSNL Tunes'], description: 'BSNL postpaid plan with entertainment subscriptions' },
      { type: 'Prepaid', price: 186, validity: '28 days', data: '2GB/day', subscriptions: ['BSNL Tunes'], description: 'Prepaid plan with high daily data for streaming' },
      { type: 'Postpaid', price: 999, validity: '30 days', data: 'Unlimited', subscriptions: ['Amazon Prime', 'ZEE5'], description: 'Ultimate BSNL postpaid plan with premium subscriptions' },
      { type: 'Prepaid', price: 365, validity: '60 days', data: '1GB/day', subscriptions: ['BSNL TV'], description: 'Mid-term prepaid plan for balanced data usage' },
      { type: 'Postpaid', price: 599, validity: '30 days', data: 'Unlimited', subscriptions: ['BSNL Tunes'], description: 'Postpaid plan with unlimited data and tunes subscription' }
    ]    
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const calculateGST = (basePrice) => {
    const gstAmount = basePrice * GST_RATE;
    const totalAmount = basePrice + gstAmount;
    return {
      basePrice,
      gstAmount: gstAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2)
    };
  };

  const handleConfirmRecharge = () => {
    if (!phoneNumber || !selectedPlan || !paymentMethod) {
      alert('Please fill all the details before confirming the recharge.');
      return;
    }

    const rechargeDetails = {
      phoneNumber,
      planDetails: selectedPlan,
      paymentMethod,
      serviceProvider
    };

    axios.post('http://localhost:5000/api/recharge', rechargeDetails)
      .then(response => {
        console.log(response.data);
        setRechargeSuccess(true);
        generatePDF();
      })
      .catch(error => {
        console.error(error.response ? error.response.data : error.message);
        alert('Recharge failed! Please try again.');
      });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Mobile Recharge</h1>

      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2">Phone Number</label>
        <input
          type="text"
          className="border rounded-md p-2 w-full"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2">Service Provider</label>
        <select
          className="border rounded-md p-2 w-full"
          value={serviceProvider}
          onChange={(e) => setServiceProvider(e.target.value)}
        >
          <option value="">Select Service Provider</option>
          <option value="Jio">Jio</option>
          <option value="Vi">Vi</option>
          <option value="Airtel">Airtel</option>
          <option value="BSNL">BSNL</option>
        </select>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Select a Plan</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {serviceProvider && plansByProvider[serviceProvider]?.map((plan, index) => (
          <div
            key={index}
            className={`relative border rounded-lg shadow-lg p-6 bg-white transition-transform duration-200 hover:scale-105 cursor-pointer ${selectedPlan === plan ? 'border-blue-500 bg-blue-100' : 'border-gray-200'}`}
            onClick={() => handlePlanSelect(plan)}
          >
            <h3 className="font-bold text-xl mb-2">{plan.type} - ₹{plan.price}</h3>
            <p className="text-gray-600">{plan.validity}</p>
            <p className="font-semibold">{plan.data}</p>
            <p className="text-sm">Subscriptions: {plan.subscriptions.join(', ')}</p>
            <p className="text-gray-700">{plan.description}</p>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <div className="mt-6 p-4 border rounded-md bg-gray-100">
          <h3 className="text-xl font-semibold">Plan Details</h3>
          <p><strong>Plan Type:</strong> {selectedPlan.type}</p>
          <p><strong>Base Price:</strong> ₹{selectedPlan.price}</p>
          <p><strong>Validity:</strong> {selectedPlan.validity}</p>
          <p><strong>Data:</strong> {selectedPlan.data}</p>

          <div className="mt-4">
            <label className="block text-lg font-semibold mb-2">Payment Method</label>
            <select
              className="border rounded-md p-2 w-full"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Select Payment Method</option>
              <option value="UPI">UPI</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
            </select>
          </div>

          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={handleConfirmRecharge}
          >
            Confirm Recharge and Generate Bill
          </button>
        </div>
      )}

      {rechargeSuccess && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 border border-green-500 rounded-md">
          Recharge successful for phone number {phoneNumber} with {serviceProvider} plan!
        </div>
      )}
    </div>
  );
};

export default LandingPage;
