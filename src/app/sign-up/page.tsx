import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create an account</h1>
          <p className="text-gray-600">Join our community of Find Next AI</p>
        </div>
        <SignUp
        path="/sign-up"
        appearance={{
            elements: {
              formButtonPrimary: 
                "bg-emerald-600 hover:bg-emerald-700 text-sm normal-case",
              card: "bg-white shadow-2xl rounded-2xl border-0 p-8",
              headerTitle: "text-2xl font-bold text-gray-900",
              headerSubtitle: "text-gray-600",
              socialButtonsBlockButton: "border-gray-200 hover:bg-gray-50 text-gray-600",
              socialButtonsBlockButtonText: "font-medium text-gray-600",
              dividerLine: "bg-gray-200",
              dividerText: "text-gray-500",
              formFieldLabel: "text-gray-700 font-medium",
              formFieldInput: "rounded-lg border-gray-300 focus:ring-emerald-500 focus:border-emerald-500",
              footerActionLink: "text-emerald-600 hover:text-emerald-700",
              identityPreviewText: "text-gray-600",
              identityPreviewEditButton: "text-emerald-600 hover:text-emerald-700",
              formResendCodeLink: "text-emerald-600 hover:text-emerald-700",
            },
            layout: {
              socialButtonsPlacement: "top",
              showOptionalFields: false,
            },
          }}
          routing="path"
          signInUrl="/sign-in"
          redirectUrl="/"
        />
      </div>
    </div>
  );
} 