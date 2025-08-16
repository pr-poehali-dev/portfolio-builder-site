import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

const Portfolio = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Portfolio data that can be edited
  const [portfolioData, setPortfolioData] = useState({
    name: "Александр Иванов",
    title: "Fullstack Developer",
    description: "Создаю современные веб-приложения с использованием React, Node.js и TypeScript. Специализируюсь на разработке высокопроизводительных SPA и микросервисной архитектуре.",
    email: "alex@example.com",
    github: "github.com/alexdev",
    telegram: "@alexdev",
    skills: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Node.js", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "Docker", level: 75 },
      { name: "AWS", level: 70 }
    ],
    experience: [
      {
        title: "Senior Fullstack Developer",
        company: "TechCorp",
        period: "2022 - Настоящее время",
        description: "Руководство командой из 5 разработчиков, архитектура микросервисов"
      },
      {
        title: "Frontend Developer", 
        company: "StartupLab",
        period: "2020 - 2022",
        description: "Разработка SPA на React, оптимизация производительности"
      }
    ],
    projects: [
      {
        id: 1,
        title: "E-commerce Platform",
        description: "Полнофункциональная платформа электронной коммерции с React и Node.js",
        technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
        image: "/img/90b336d2-fd83-4a36-bae9-cdb6f17c595d.jpg"
      },
      {
        id: 2, 
        title: "Task Management App",
        description: "Приложение для управления задачами с real-time обновлениями",
        technologies: ["React", "Socket.io", "MongoDB", "Express"],
        image: "/img/e39c63a6-68c6-4b0a-9880-361dff547484.jpg"
      },
      {
        id: 3,
        title: "Analytics Dashboard",
        description: "Дашборд для анализа данных с интерактивными графиками",
        technologies: ["React", "D3.js", "Python", "FastAPI"],
        image: "/img/7badc204-31cd-4e0f-81d2-ab1267f09333.jpg"
      }
    ]
  });

  const AdminPanel = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="fixed top-4 right-4 z-50">
          <Icon name="Settings" size={16} />
          Админ панель
        </Button>
      </SheetTrigger>
      <SheetContent className="w-96 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Админ панель</SheetTitle>
          <SheetDescription>
            Управление контентом портфолио
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6 mt-6">
          <div className="flex items-center space-x-2">
            <Switch 
              checked={isEditMode} 
              onCheckedChange={setIsEditMode}
              id="edit-mode"
            />
            <label htmlFor="edit-mode">Режим редактирования</label>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Основная информация</h3>
            <Input 
              placeholder="Имя"
              value={portfolioData.name}
              onChange={(e) => setPortfolioData({...portfolioData, name: e.target.value})}
            />
            <Input 
              placeholder="Должность"
              value={portfolioData.title}
              onChange={(e) => setPortfolioData({...portfolioData, title: e.target.value})}
            />
            <Textarea 
              placeholder="Описание"
              value={portfolioData.description}
              onChange={(e) => setPortfolioData({...portfolioData, description: e.target.value})}
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Добавить проект</h3>
            <Input placeholder="Название проекта" />
            <Textarea placeholder="Описание проекта" />
            <Input placeholder="Загрузить изображение" type="file" accept="image/*" />
            <Button className="w-full">
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить проект
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  const EditableText = ({ value, onChange, className = "", multiline = false }) => {
    if (!isEditMode) {
      return multiline ? 
        <p className={className}>{value}</p> : 
        <span className={className}>{value}</span>;
    }

    return multiline ? (
      <Textarea 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`min-h-[100px] ${className}`}
      />
    ) : (
      <Input 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
      />
    );
  };

  return (
    <div className="min-h-screen bg-background dark">
      {isAdmin && <AdminPanel />}
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            <EditableText
              value={portfolioData.name}
              onChange={(val) => setPortfolioData({...portfolioData, name: val})}
              className="text-6xl md:text-8xl font-bold font-mono mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            />
            <EditableText
              value={portfolioData.title}
              onChange={(val) => setPortfolioData({...portfolioData, title: val})}
              className="text-xl md:text-2xl text-muted-foreground mb-8 font-mono"
            />
            <EditableText
              value={portfolioData.description}
              onChange={(val) => setPortfolioData({...portfolioData, description: val})}
              className="text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
              multiline
            />
            
            <div className="flex justify-center gap-6 mb-12">
              <Button size="lg" className="font-mono">
                <Icon name="Mail" size={20} className="mr-2" />
                Связаться
              </Button>
              <Button variant="outline" size="lg" className="font-mono">
                <Icon name="Download" size={20} className="mr-2" />
                Скачать CV
              </Button>
            </div>

            <div className="flex justify-center gap-6">
              <Button variant="ghost" size="sm">
                <Icon name="Github" size={20} />
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Mail" size={20} />
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="MessageCircle" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold font-mono mb-16 text-center">
            <Icon name="User" size={32} className="inline mr-4" />
            Обо мне
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-up">
              <EditableText
                value={portfolioData.description}
                onChange={(val) => setPortfolioData({...portfolioData, description: val})}
                className="text-lg leading-relaxed"
                multiline
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-mono font-semibold text-primary mb-2">5+</h3>
                  <p className="text-sm text-muted-foreground">Лет опыта</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-mono font-semibold text-primary mb-2">50+</h3>
                  <p className="text-sm text-muted-foreground">Проектов</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-80 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Icon name="Code2" size={120} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 px-6 bg-card/50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold font-mono mb-16 text-center">
            <Icon name="Zap" size={32} className="inline mr-4" />
            Навыки
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioData.skills.map((skill, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-mono font-semibold">{skill.name}</h3>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold font-mono mb-16 text-center">
            <Icon name="Briefcase" size={32} className="inline mr-4" />
            Опыт работы
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {portfolioData.experience.map((exp, index) => (
              <Card key={index} className="relative">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="font-mono">{exp.title}</CardTitle>
                      <CardDescription className="text-primary font-semibold">{exp.company}</CardDescription>
                    </div>
                    <Badge variant="outline" className="font-mono">{exp.period}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{exp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 px-6 bg-card/50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold font-mono mb-16 text-center">
            <Icon name="FolderOpen" size={32} className="inline mr-4" />
            Проекты
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.map((project) => (
              <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-mono group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Icon name="ExternalLink" size={16} className="mr-2" />
                      Демо
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Github" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold font-mono mb-8">
            <Icon name="MessageSquare" size={32} className="inline mr-4" />
            Связаться со мной
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Готов обсудить ваш проект или возможности сотрудничества
          </p>
          
          <div className="flex justify-center gap-6 mb-12">
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <Icon name="Mail" size={24} className="mx-auto mb-4 text-primary" />
              <h3 className="font-mono font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground">{portfolioData.email}</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <Icon name="Github" size={24} className="mx-auto mb-4 text-primary" />
              <h3 className="font-mono font-semibold mb-2">GitHub</h3>
              <p className="text-muted-foreground">{portfolioData.github}</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <Icon name="MessageCircle" size={24} className="mx-auto mb-4 text-primary" />
              <h3 className="font-mono font-semibold mb-2">Telegram</h3>
              <p className="text-muted-foreground">{portfolioData.telegram}</p>
            </Card>
          </div>

          <Button size="lg" className="font-mono">
            <Icon name="Send" size={20} className="mr-2" />
            Написать сообщение
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t bg-card/30">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground font-mono">
            © 2024 {portfolioData.name}. Создано с ❤️ в России
          </p>
        </div>
      </footer>

      {/* Admin Toggle (hidden in production) */}
      {process.env.NODE_ENV === 'development' && (
        <Button
          onClick={() => setIsAdmin(!isAdmin)}
          className="fixed bottom-4 left-4 z-50"
          variant="outline"
          size="sm"
        >
          {isAdmin ? 'Выйти из админки' : 'Войти в админку'}
        </Button>
      )}
    </div>
  );
};

export default Portfolio;