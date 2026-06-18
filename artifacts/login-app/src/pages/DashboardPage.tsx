import { useGetMe, useLogout } from "@workspace/api-client-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LogOut, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const { data: user, isLoading } = useGetMe();
  const logout = useLogout();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  async function handleLogout() {
    await logout.mutateAsync({});
    toast({ title: "Signed out", description: "See you next time." });
    navigate("/");
  }

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <p className="text-muted-foreground text-sm">Loading...</p>
      </div>
    );
  }

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 sm:p-8">
      <div className="w-full max-w-md animate-float-up" style={{ animationDuration: "0.6s" }}>
        <Card className="shadow-xl border-card-border/60">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shrink-0">
                <User size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  Welcome, {user.name}
                </h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted/40 border border-border/50 p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">User ID</span>
                <span className="font-mono font-medium text-foreground">#{user.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Member since</span>
                <span className="font-medium text-foreground">
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full h-11"
              onClick={handleLogout}
              disabled={logout.isPending}
            >
              <LogOut size={16} className="mr-2" />
              {logout.isPending ? "Signing out..." : "Sign out"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
