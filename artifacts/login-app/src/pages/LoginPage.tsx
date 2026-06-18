import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "wouter";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    toast({
      title: "Successfully logged in",
      description: "Welcome back to the platform.",
    });
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 sm:p-8">
      <div className="w-full max-w-md animate-float-up" style={{ animationDuration: '0.8s' }}>
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg mb-4">
            <LogIn size={24} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h1>
          <p className="text-muted-foreground mt-2 text-sm">Sign in to your account to continue</p>
        </div>

        <Card className="shadow-xl border-card-border/60">
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/80">Email address</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="name@example.com" 
                          type="email" 
                          autoComplete="email" 
                          disabled={isLoading}
                          className="h-11 transition-all duration-200 focus:shadow-[0_0_0_2px_hsl(var(--primary)/0.2)]"
                          data-testid="input-email"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-foreground/80">Password</FormLabel>
                        <a href="#" className="text-sm font-medium text-primary hover:underline" data-testid="link-forgot-password">
                          Forgot password?
                        </a>
                      </div>
                      <FormControl>
                        <Input 
                          placeholder="••••••••" 
                          type="password" 
                          autoComplete="current-password"
                          disabled={isLoading}
                          className="h-11 transition-all duration-200 focus:shadow-[0_0_0_2px_hsl(var(--primary)/0.2)]"
                          data-testid="input-password"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full h-11 text-base font-medium shadow-md transition-all hover:shadow-lg" 
                  disabled={isLoading}
                  data-testid="button-submit"
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </Form>
          </CardContent>
          
          <CardFooter className="flex flex-col border-t bg-muted/20 px-6 py-4">
            <div className="text-sm text-center text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register" className="font-semibold text-primary hover:underline transition-colors" data-testid="link-register">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
