import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-background">
      <h1 className="text-5xl font-bold text-foreground mb-4">404</h1>
      <p className="text-muted-foreground mb-8">Page not found</p>
      <Button onClick={() => navigate("/")}>Go Home</Button>
    </div>
  );
}
