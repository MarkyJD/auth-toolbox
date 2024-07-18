interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="h-full flex items-center justify-center bg-sky-700">
      {children}
    </div>
  );
};

export default AuthLayout;
