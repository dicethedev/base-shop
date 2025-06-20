import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, Eye, Lock, Trash2 } from "lucide-react";

export function PrivacyPolicy() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-600" />
          Privacy & Data Usage
        </CardTitle>
        <CardDescription>
          Your privacy is our priority. Here's how we handle your data:
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-start gap-3">
            <Eye className="h-4 w-4 text-green-600 mt-1" />
            <div>
              <h4 className="font-medium text-sm">What We Collect</h4>
              <p className="text-xs text-muted-foreground">
                Email, shipping address, phone number, and name for order
                fulfillment only
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Lock className="h-4 w-4 text-blue-600 mt-1" />
            <div>
              <h4 className="font-medium text-sm">How We Protect It</h4>
              <p className="text-xs text-muted-foreground">
                Data is encrypted and stored securely. Never shared with third
                parties
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Trash2 className="h-4 w-4 text-red-600 mt-1" />
            <div>
              <h4 className="font-medium text-sm">Data Retention</h4>
              <p className="text-xs text-muted-foreground">
                Automatically deleted after 90 days unless required for warranty
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Shield className="h-4 w-4 text-purple-600 mt-1" />
            <div>
              <h4 className="font-medium text-sm">Your Control</h4>
              <p className="text-xs text-muted-foreground">
                You can request data deletion or updates anytime via support
              </p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-800">
            <strong>Smart Wallet Privacy:</strong> Your data is collected
            directly by your Smart Wallet and only shared with us after your
            explicit consent. We never see your data until you approve sharing
            it.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
