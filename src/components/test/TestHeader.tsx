
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TestModule } from '@/types/test';

interface TestHeaderProps {
  currentModuleData: TestModule;
}

const TestHeader = ({ currentModuleData }: TestHeaderProps) => {
  const CurrentIcon = currentModuleData.icon;

  return (
    <Card className="medical-card mb-6 animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-medical-blue/10 rounded-lg">
            <CurrentIcon className="h-6 w-6 text-medical-blue" />
          </div>
          {currentModuleData.title}
        </CardTitle>
        <CardDescription>
          {currentModuleData.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default TestHeader;
