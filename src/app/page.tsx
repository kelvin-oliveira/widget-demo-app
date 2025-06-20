"use client";

import { Position, Status, Theme, Widget } from "@k12kelvin/chat-widget";
import { Copy, Monitor, RefreshCw, Settings, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { themes } from "@/constants/themes";
import { usePlaygroundStore } from "@/stores/playground-store";

export default function WidgetPlayground() {
  // State for customization
  const brand = usePlaygroundStore((s) => s.brand);
  const chatContext = usePlaygroundStore((s) => s.chatContext);
  const position = usePlaygroundStore((s) => s.position);
  const showBrand = usePlaygroundStore((s) => s.showBrand);
  const status = usePlaygroundStore((s) => s.status);
  const suggestedQuestions = usePlaygroundStore((s) => s.suggestedQuestions);
  const themeOption = usePlaygroundStore((s) => s.themeOption);
  const theme = themes[themeOption];
  const title = usePlaygroundStore((s) => s.title);

  // Actions to update the store
  const reset = usePlaygroundStore((s) => s.reset);
  const setBrand = usePlaygroundStore((s) => s.setBrand);
  const setChatContext = usePlaygroundStore((s) => s.setChatContext);
  const setPosition = usePlaygroundStore((s) => s.setPosition);
  const setShowBrand = usePlaygroundStore((s) => s.setShowBrand);
  const setStatus = usePlaygroundStore((s) => s.setStatus);
  const setSuggestedQuestions = usePlaygroundStore(
    (s) => s.setSuggestedQuestions,
  );
  const setThemeOption = usePlaygroundStore((s) => s.setThemeOption);
  const setTitle = usePlaygroundStore((s) => s.setTitle);

  const generateCode = () => {
    const configStr = JSON.stringify(
      {
        brand,
        chatContext,
        position,
        showBrand,
        status,
        suggestedQuestions,
        theme,
        title,
      },
      null,
      2,
    );
    return `import { Widget } from './widget';

const props = ${configStr};

export function CustomWidget() {
  return <Widget {...props} />
}`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateCode());
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto max-w-7xl p-4 lg:p-8">
        <div className="mb-8 space-y-4 text-center lg:mb-12">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Sparkles className="text-primary size-6" />
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Widget Playground
            </h1>
          </div>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Design and customize your chat widget with real-time preview
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button className="gap-2" onClick={reset} variant="outline">
              <RefreshCw className="size-4" />
              Reset to Defaults
            </Button>
          </div>
        </div>
        <div className="mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="size-5" />
                Widget Configuration
              </CardTitle>
              <CardDescription>
                Customize your widget&apos;s behavior and appearance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs className="w-full" defaultValue="general">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger className="gap-2" value="general">
                    <Settings className="size-4" />
                    <span className="hidden sm:inline">General</span>
                  </TabsTrigger>
                  <TabsTrigger className="gap-2" value="content">
                    <Sparkles className="size-4" />
                    <span className="hidden sm:inline">Content</span>
                  </TabsTrigger>
                  <TabsTrigger className="gap-2" value="code">
                    <Monitor className="size-4" />
                    <span className="hidden sm:inline">Code</span>
                  </TabsTrigger>
                </TabsList>
                <TabsContent className="mt-6 space-y-6" value="general">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        onValueChange={(value: Status) => setStatus(value)}
                        value={status}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">
                            <div className="flex items-center gap-2">
                              <div className="size-2 rounded-full bg-green-500" />
                              Online
                            </div>
                          </SelectItem>
                          <SelectItem value="maintenance">
                            <div className="flex items-center gap-2">
                              <div className="size-2 rounded-full bg-yellow-500" />
                              Maintenance
                            </div>
                          </SelectItem>
                          <SelectItem value="offline">
                            <div className="flex items-center gap-2">
                              <div className="size-2 rounded-full bg-gray-500" />
                              Offline
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Select
                        onValueChange={(value: Position) => setPosition(value)}
                        value={position}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bottom-right">
                            Bottom Right
                          </SelectItem>
                          <SelectItem value="bottom-left">
                            Bottom Left
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label>Theme Presets</Label>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {Object.entries(themes).map(([key, preset]) => (
                        <Button
                          className="justify-start gap-2"
                          key={key}
                          onClick={() =>
                            setThemeOption(key as keyof typeof themes)
                          }
                          size="sm"
                          variant={key === themeOption ? "default" : "outline"}
                        >
                          <div
                            className="size-3 rounded-full"
                            style={{
                              backgroundColor: (preset as Theme).primary,
                            }}
                          />
                          <span className="text-xs capitalize">{key}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Widget Title</Label>
                    <Input
                      id="title"
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Widget Title"
                      value={title}
                    />
                  </div>
                  <div className="bg-muted/50 space-y-4 rounded-lg border p-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={showBrand}
                        id="showBrand"
                        onCheckedChange={(checked) => setShowBrand(checked)}
                      />
                      <Label htmlFor="showBrand">Show Brand</Label>
                    </div>
                    {showBrand && (
                      <div className="animate-in slide-in-from-top-1 grid grid-cols-1 gap-4 duration-200 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="brandName">Brand Name</Label>
                          <Input
                            id="brandName"
                            onChange={(e) =>
                              setBrand({ ...brand, name: e.target.value })
                            }
                            placeholder="Your Brand Name"
                            value={brand.name}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="brandUrl">Brand URL</Label>
                          <Input
                            id="brandUrl"
                            onChange={(e) =>
                              setBrand({ ...brand, websiteUrl: e.target.value })
                            }
                            placeholder="https://yourwebsite.com"
                            value={brand.websiteUrl}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent className="mt-6 space-y-6" value="content">
                  <div className="space-y-2">
                    <Label htmlFor="chatContext">Chat Context</Label>
                    <Textarea
                      className="resize-none"
                      id="chatContext"
                      onChange={(e) => setChatContext(e.target.value)}
                      placeholder="Additional context for the AI assistant"
                      rows={4}
                      value={chatContext}
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Suggested Questions</Label>
                      <Button
                        onClick={() => {
                          setSuggestedQuestions([...suggestedQuestions, ""]);
                        }}
                        size="sm"
                        variant="outline"
                      >
                        Add Question
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {suggestedQuestions.map((question, index) => (
                        <div className="flex gap-2" key={index}>
                          <Input
                            onChange={(e) => {
                              const newQuestions = [...suggestedQuestions];
                              newQuestions[index] = e.target.value;
                              setSuggestedQuestions(newQuestions);
                            }}
                            placeholder={`Question ${index + 1}`}
                            value={question}
                          />
                          <Button
                            onClick={() => {
                              const newQuestions = suggestedQuestions.filter(
                                (_, i) => i !== index,
                              );
                              setSuggestedQuestions(newQuestions);
                            }}
                            size="sm"
                            variant="destructive"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent className="mt-6 space-y-4" value="code">
                  <ScrollArea className="bg-muted/50 h-[400px] w-full rounded-lg border">
                    <pre className="p-4 text-sm">
                      <code className="text-muted-foreground">
                        {generateCode()}
                      </code>
                    </pre>
                  </ScrollArea>
                  <div className="flex justify-end">
                    <Button
                      className="gap-2"
                      onClick={handleCopyCode}
                      size="sm"
                    >
                      <Copy className="size-4" />
                      Copy Code
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      <Widget
        brand={brand}
        chatContext={chatContext}
        position={position}
        showBrand={showBrand}
        status={status}
        suggestedQuestions={suggestedQuestions}
        theme={theme}
        title={title}
      />
    </div>
  );
}
