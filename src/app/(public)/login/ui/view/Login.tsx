"use client";

export default function Login(props: any) {
  const { onGoogleLogin, isSubmitting } = props;

  return (
    <div className="bg-wf-background text-wf-on-background font-inter antialiased min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-wf-primary-fixed blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-wf-secondary-fixed blur-[100px]"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Login Card */}
        <div className="bg-wf-on-primary rounded-xl p-8 shadow-[0_4px_24px_rgba(4,12,33,0.08)] border border-wf-surface-variant flex flex-col gap-6">
          {/* Branding Header */}
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-12 h-12 bg-wf-primary text-wf-on-primary rounded-lg flex items-center justify-center mb-1 shadow-sm">
              <span className="material-symbols-outlined" style={{ fontSize: "28px" }}>account_balance_wallet</span>
            </div>
            <h1 className="font-manrope text-3xl font-bold text-wf-primary">WealthFlow</h1>
            <p className="font-inter text-base text-wf-on-surface-variant">Manage your global finances in one place</p>
          </div>

          {/* Value Prop Banner */}
          <div className="bg-wf-surface-container-low rounded-lg p-4 border border-wf-surface-variant flex items-start gap-4">
            <span className="material-symbols-outlined text-wf-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
            <p className="font-inter text-[14px] leading-tight text-wf-on-surface-variant">Secure, encrypted access to all your accounts. Bank-level security standard.</p>
          </div>

          {/* Login Actions */}
          <div className="flex flex-col gap-4 mt-2">
            {/* Primary Action: Google SSO */}
            <button
              onClick={onGoogleLogin}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-4 bg-wf-on-primary border border-wf-outline-variant hover:border-wf-primary focus:border-wf-primary text-wf-on-surface font-semibold text-xs uppercase tracking-wider rounded-lg py-4 px-6 transition-all duration-200 shadow-sm hover:shadow-[0_4px_12px_rgba(4,12,33,0.05)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              Continue with Google
            </button>
          </div>

          {/* Footer Links */}
          <div className="text-center mt-2">
            <p className="font-inter text-[13px] text-wf-on-surface-variant">
              By continuing, you agree to our
              <a className="text-wf-primary hover:underline underline-offset-2 ml-1" href="#">Terms of Service</a> and
              <a className="text-wf-primary hover:underline underline-offset-2 ml-1" href="#">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
