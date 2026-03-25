export default function AppDashboardLayout(props: {
  children: React.ReactNode;
  intercepting: React.ReactNode;
}) {
  const { children, intercepting } = props;
  return (
    <>
      {children}
      {intercepting}
    </>
  );
}
