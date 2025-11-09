import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Target, Trophy, TrendingUp, Zap, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 animate-bounce-subtle">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Gamified Study Tracking</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-primary">
              Master Your Exam Prep with Pohrapati
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Track every topic, build study streaks, and achieve your goals with our beautiful, gamified preparation tracker.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="text-lg px-8 bg-gradient-primary border-0 shadow-medium hover:shadow-strong transition-all">
                  Get Started Free
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 border-2">
                See How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Systematic tracking meets motivation. Stay organized and inspired throughout your preparation journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: BookOpen,
                title: "Organized Hierarchy",
                description: "Structure your prep with Papers → Topics → Subtopics. Track Theory, PYQs, Tests, and Confidence levels.",
                gradient: "from-primary to-primary/70"
              },
              {
                icon: Target,
                title: "Progress Tracking",
                description: "Monitor completion percentages, confidence scores, and marks covered with beautiful visual dashboards.",
                gradient: "from-success to-success/70"
              },
              {
                icon: Trophy,
                title: "Achievement System",
                description: "Earn badges, maintain daily streaks, and unlock rewards as you complete topics and reach milestones.",
                gradient: "from-accent to-accent/70"
              },
              {
                icon: TrendingUp,
                title: "Smart Analytics",
                description: "Filter by preparation, paper, or topic. Get insights with progress bars, pie charts, and detailed reports.",
                gradient: "from-primary to-success"
              },
              {
                icon: Zap,
                title: "Daily Motivation",
                description: "Stay inspired with streak tracking, motivational quotes, and reward animations for every milestone.",
                gradient: "from-success to-accent"
              },
              {
                icon: BarChart3,
                title: "Flexible Management",
                description: "Add custom columns, edit subtopics, manage multiple preparations. Your prep, your way.",
                gradient: "from-accent to-primary"
              },
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-strong transition-all duration-300 animate-scale-in border-0 bg-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto bg-gradient-primary border-0 shadow-strong">
            <CardContent className="p-12 text-center">
              <Trophy className="h-16 w-16 text-white mx-auto mb-6 animate-bounce-subtle" />
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Transform Your Study Routine?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join students who are crushing their exam prep with systematic tracking and gamified motivation.
              </p>
              <Link to="/auth">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 shadow-medium">
                  Start Your Journey
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Pohrapati</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2025 Pohrapati. Built for exam success.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
