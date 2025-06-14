
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface FormState {
  primaryColor: string;
  position: 'bottom-right' | 'bottom-left';
  siteName: string;
}

interface EmbedConfigProps {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  onRefresh: () => void;
}

const EmbedConfig: React.FC<EmbedConfigProps> = ({ formState, setFormState, onRefresh }) => {
  return (
    <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Configuration Options</h2>
      <p className="text-gray-600 mb-6">
        Change the options below and click refresh to update the preview and the embed code.
      </p>
      <div className="space-y-4">
        <div>
          <Label htmlFor="siteName">Site Name</Label>
          <Input
            id="siteName"
            value={formState.siteName}
            onChange={(e) => setFormState({ ...formState, siteName: e.target.value })}
            placeholder="Your Website Name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="primaryColor">Primary Color</Label>
          <Input
            id="primaryColor"
            type="color"
            value={formState.primaryColor}
            onChange={(e) => setFormState({ ...formState, primaryColor: e.target.value })}
            className="w-24 p-1 h-10"
          />
        </div>
        <div>
          <Label htmlFor="position">Widget Position</Label>
          <Select
            value={formState.position}
            onValueChange={(value: 'bottom-right' | 'bottom-left') => {
              setFormState({ ...formState, position: value });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bottom-right">Bottom Right</SelectItem>
              <SelectItem value="bottom-left">Bottom Left</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={onRefresh} className="mt-6">
        <RefreshCw className="mr-2 h-4 w-4" />
        Refresh Code & Preview
      </Button>
    </div>
  );
};

export default EmbedConfig;
