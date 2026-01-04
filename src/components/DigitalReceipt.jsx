import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { X, Download, Printer } from "lucide-react";

export default function DigitalReceipt({ orderData, onClose }) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    alert("PDF download functionality would be implemented here");
  };

  return (
    <div className="fixed inset-0 bg-neutral-900/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <h2 className="text-xl font-medium text-foreground">Digital Receipt</h2>
          <Button
            variant="ghost"
            size="sm"
            className="bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={onClose}
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </Button>
        </div>

        <CardContent className="p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-medium text-foreground">
              {orderData.vendorName}
            </h3>
            {orderData.vendorAddress && (
              <p className="text-sm text-muted-foreground">
                {orderData.vendorAddress}
              </p>
            )}
            {orderData.vendorPhone && (
              <p className="text-sm text-muted-foreground">
                {orderData.vendorPhone}
              </p>
            )}
          </div>

          <Separator />

          {/* Order Info */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Order ID:</span>
              <span className="font-mono text-foreground">
                {orderData.trackingId}
              </span>
            </div>
            {orderData.createdDate && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date:</span>
                <span className="text-foreground">{orderData.createdDate}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Customer:</span>
              <span className="text-foreground">
                {orderData.customerPhone}
              </span>
            </div>
          </div>

          <Separator />

          {/* Items */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Items</h4>
            {orderData.items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <div className="flex-1">
                  <span className="text-foreground">{item.name}</span>
                  <span className="text-muted-foreground ml-2">
                    x{item.quantity}
                  </span>
                </div>
                <span className="text-foreground">
                  ${item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <Separator />

          {/* Totals */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal:</span>
              <span className="text-foreground">
                ${orderData.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax:</span>
              <span className="text-foreground">
                ${orderData.tax.toFixed(2)}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-medium">
              <span className="text-foreground">Total:</span>
              <span className="text-foreground">
                ${orderData.total.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Payment Status:</span>
              <span
                className={
                  orderData.paymentStatus === "Paid"
                    ? "text-green-600"
                    : "text-yellow-500"
                }
              >
                {orderData.paymentStatus}
              </span>
            </div>
          </div>

          <Separator />

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground">
            <p>Thank you for your business!</p>
            <p className="mt-2">Powered by Laundrify</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4 mr-2" strokeWidth={2} />
              Download PDF
            </Button>
            <Button
              variant="outline"
              className="flex-1 border border-gray-300 text-gray-800 bg-white hover:bg-gray-100"
              onClick={handlePrint}
            >
              <Printer className="w-4 h-4 mr-2" strokeWidth={2} />
              Print
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
