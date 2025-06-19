
import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const universities = [
  'Universidade de São Paulo (USP)',
  'Universidade Federal do Rio de Janeiro (UFRJ)',
  'Universidade Federal de Minas Gerais (UFMG)',
  'Universidade Federal do Rio Grande do Sul (UFRGS)',
  'Universidade Federal de São Paulo (UNIFESP)',
  'Universidade de Brasília (UnB)',
  'Universidade Federal da Bahia (UFBA)',
  'Universidade Federal do Paraná (UFPR)',
  'Universidade Federal de Santa Catarina (UFSC)',
  'Universidade Federal do Ceará (UFC)',
  'Pontifícia Universidade Católica de São Paulo (PUC-SP)',
  'Universidade Federal de Pernambuco (UFPE)',
  'Universidade Federal Fluminense (UFF)',
  'Universidade Federal de Goiás (UFG)',
  'Universidade Federal do Espírito Santo (UFES)',
  'Universidade Federal de Alagoas (UFAL)',
  'Universidade Federal do Maranhão (UFMA)',
  'Universidade Federal do Pará (UFPA)',
  'Universidade Federal de Sergipe (UFS)',
  'Universidade Federal do Rio Grande do Norte (UFRN)',
];

interface UniversityComboboxProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const UniversityCombobox = ({ 
  value, 
  onValueChange, 
  placeholder = "Selecione ou digite sua universidade...",
  className 
}: UniversityComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const filteredUniversities = universities.filter(university =>
    university.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSelect = (selectedValue: string) => {
    onValueChange(selectedValue);
    setOpen(false);
    setInputValue('');
  };

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    // If user is typing something not in the list, allow it as a custom value
    if (newValue && !universities.some(uni => uni.toLowerCase().includes(newValue.toLowerCase()))) {
      onValueChange(newValue);
    }
  };

  const displayValue = value || placeholder;
  const isCustomValue = value && !universities.includes(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          <span className={cn(
            "truncate",
            !value && "text-muted-foreground"
          )}>
            {displayValue}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput 
            placeholder="Digite para pesquisar ou adicionar nova..."
            value={inputValue}
            onValueChange={handleInputChange}
          />
          <CommandList>
            <CommandEmpty>
              {inputValue ? (
                <div className="p-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleSelect(inputValue)}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Usar "{inputValue}"
                  </Button>
                </div>
              ) : (
                "Nenhuma universidade encontrada."
              )}
            </CommandEmpty>
            <CommandGroup>
              {filteredUniversities.map((university) => (
                <CommandItem
                  key={university}
                  value={university}
                  onSelect={() => handleSelect(university)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === university ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {university}
                </CommandItem>
              ))}
            </CommandGroup>
            {isCustomValue && (
              <CommandGroup>
                <CommandItem
                  value={value}
                  onSelect={() => handleSelect(value)}
                >
                  <Check className="mr-2 h-4 w-4 opacity-100" />
                  {value} (personalizada)
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
