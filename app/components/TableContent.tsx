"use client"
import React, { useState, useEffect } from 'react'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Check, ChevronsUpDown, Plus, Save, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { toast } from 'sonner'
import { ScrollArea } from '@/components/ui/scroll-area'

// Tipos de datos disponibles
const dataTypes = [
    {
        value: "string",
        label: "String",
    },
    {
        value: "array",
        label: "Array",
    },
    {
        value: "object",
        label: "Object",
    },
    {
        value: "number",
        label: "Number",
    },
    {
        value: "boolean",
        label: "Boolean",
    },
]

// Interfaz para cada propiedad del objeto
interface Property {
    id: string;
    name: string;
    type: string;
    value: any;
    children?: Property[];
}

// Componente para seleccionar el tipo de dato
export function DataTypeSelector({ value, onChange }: { value: string, onChange: (value: string) => void }) {
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? dataTypes.find((type) => type.value === value)?.label
                        : "Select type..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search type..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No type found.</CommandEmpty>
                        <CommandGroup>
                            {dataTypes.map((type) => (
                                <CommandItem
                                    key={type.value}
                                    value={type.value}
                                    onSelect={(currentValue) => {
                                        onChange(currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    {type.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === type.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

// Componente para editar una propiedad
function PropertyEditor({ property, onChange, onDelete }: { 
    property: Property, 
    onChange: (updatedProperty: Property) => void,
    onDelete: () => void
}) {
    // Maneja cambio de nombre
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({
            ...property,
            name: e.target.value
        });
    }

    // Maneja cambio de tipo
    const handleTypeChange = (type: string) => {
        let value: any = '';
        let children: Property[] | undefined = undefined;
        
        // Establecer valor por defecto según el tipo
        if (type === 'string') value = '';
        else if (type === 'number') value = 0;
        else if (type === 'boolean') value = false;
        else if (type === 'array' || type === 'object') {
            value = type === 'array' ? [] : {};
            children = [];
        }

        onChange({
            ...property,
            type,
            value,
            children
        });
    }

    // Maneja cambio de valor
    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let parsedValue: any = e.target.value;
        
        // Convertir al tipo correcto
        if (property.type === 'number') {
            parsedValue = parseFloat(e.target.value) || 0;
        } else if (property.type === 'boolean') {
            parsedValue = e.target.value.toLowerCase() === 'true';
        }

        onChange({
            ...property,
            value: parsedValue
        });
    }

    // Para manejar valores booleanos
    const handleBooleanChange = (value: boolean) => {
        onChange({
            ...property,
            value
        });
    }

    // Agregar propiedad hijo (para arrays y objetos)
    const addChild = () => {
        const newChild: Property = {
            id: crypto.randomUUID(),
            name: property.type === 'array' ? property.children?.length.toString() || '0' : '',
            type: 'string',
            value: ''
        };

        onChange({
            ...property,
            children: [...(property.children || []), newChild]
        });
    }

    // Actualizar una propiedad hijo
    const updateChild = (childId: string, updatedChild: Property) => {
        if (!property.children) return;
        
        const updatedChildren = property.children.map(child => 
            child.id === childId ? updatedChild : child
        );
        
        onChange({
            ...property,
            children: updatedChildren
        });
    }

    // Eliminar una propiedad hijo
    const deleteChild = (childId: string) => {
        if (!property.children) return;
        
        const updatedChildren = property.children.filter(child => child.id !== childId);
        
        onChange({
            ...property,
            children: updatedChildren
        });
    }

    return (
        <div className="border rounded-md p-2 mb-2">
            <div className="flex items-center gap-2 mb-2">
                <Input 
                    placeholder="Property name" 
                    value={property.name} 
                    onChange={handleNameChange}
                    disabled={property.type === 'array'} // Nombre automático para arrays
                    className="w-[150px]"
                />
                <DataTypeSelector value={property.type} onChange={handleTypeChange} />
                
                {/* Mostrar input según el tipo */}
                {property.type === 'string' && (
                    <Input 
                        placeholder="Value" 
                        value={property.value}
                        onChange={handleValueChange}
                        className="flex-grow"
                    />
                )}
                
                {property.type === 'number' && (
                    <Input 
                        type="number"
                        placeholder="0" 
                        value={property.value}
                        onChange={handleValueChange}
                        className="flex-grow"
                    />
                )}
                
                {property.type === 'boolean' && (
                    <div className="flex gap-2">
                        <Button 
                            variant={property.value ? "default" : "outline"}
                            onClick={() => handleBooleanChange(true)}
                            size="sm"
                        >
                            True
                        </Button>
                        <Button 
                            variant={!property.value ? "default" : "outline"}
                            onClick={() => handleBooleanChange(false)}
                            size="sm"
                        >
                            False
                        </Button>
                    </div>
                )}
                
                <Button variant="destructive" size="icon" onClick={onDelete}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>

            {/* Contenido anidado para arrays y objetos */}
            {(property.type === 'array' || property.type === 'object') && (
                <Accordion type="single" collapsible className="ml-4">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            {property.type === 'array' ? 'Array items' : 'Object properties'}
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-2">
                                {property.children?.map(child => (
                                    <PropertyEditor 
                                        key={child.id}
                                        property={child}
                                        onChange={(updated) => updateChild(child.id, updated)}
                                        onDelete={() => deleteChild(child.id)}
                                    />
                                ))}
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={addChild}
                                    className="mt-2"
                                >
                                    <Plus className="h-4 w-4 mr-2" /> 
                                    Add {property.type === 'array' ? 'Item' : 'Property'}
                                </Button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            )}
        </div>
    );
}

function TableContent({ handleGetDataApi }: { handleGetDataApi: (data: string) => void }) {
    // Estado para el objeto que se está construyendo
    const [objectName, setObjectName] = useState('myObject');
    const [properties, setProperties] = useState<Property[]>([]);
    const [jsonOutput, setJsonOutput] = useState('{}');
    const [savedObjects, setSavedObjects] = useState<{name: string, data: Property[]}[]>([]);

    // Cargar objetos guardados desde localStorage al inicio
    useEffect(() => {
        const saved = localStorage.getItem('customObjects');
        if (saved) {
            try {
                setSavedObjects(JSON.parse(saved));

            } catch (e) {
                console.error("Error loading saved objects:", e);
            }
        }
    }, []);

    // Agregar nueva propiedad
    const addProperty = () => {
        setProperties([
            ...properties,
            {
                id: crypto.randomUUID(),
                name: '',
                type: 'string',
                value: ''
            }
        ]);
    };

    // Actualizar una propiedad
    const updateProperty = (id: string, updatedProperty: Property) => {
        const updated = properties.map(prop => 
            prop.id === id ? updatedProperty : prop
        );
        setProperties(updated);
    };

    // Eliminar una propiedad
    const deleteProperty = (id: string) => {
        setProperties(properties.filter(prop => prop.id !== id));
    };

    // Crear representación JSON del objeto
    const generateJsonOutput = (props: Property[]) => {
        const processProps = (propArray: Property[]) => {
            if (propArray.length === 0) return {};
            
            const result: Record<string, any> = {};
            
            propArray.forEach(prop => {
                if (prop.type === 'array' && prop.children) {
                    result[prop.name] = prop.children.map(child => {
                        if (child.type === 'array' || child.type === 'object') {
                            return child.type === 'array' 
                                ? prop.children?.map(subChild => processProps([subChild])) 
                                : processProps(child.children || []);
                        }
                        return child.value;
                    });
                } 
                else if (prop.type === 'object' && prop.children) {
                    result[prop.name] = processProps(prop.children);
                } 
                else {
                    result[prop.name] = prop.value;
                }
            });
            
            return result;
        };
        
        return JSON.stringify(processProps(props), null, 2);
    };

    // Actualizar el JSON al cambiar las propiedades
    useEffect(() => {
        const output = generateJsonOutput(properties);
        setJsonOutput(output);
        handleGetDataApi(output);
    }, [properties]);

    // Guardar el objeto actual en localStorage
    const saveObject = () => {
        if (!objectName.trim()) {
            toast.error("Please provide an object name");
            return;
        }

        if (properties.length === 0) {
            toast.error("Add at least one property to your object");
            return;
        }

        // Check for empty property names
        const hasEmptyNames = properties.some(prop => !prop.name.trim());
        if (hasEmptyNames) {
            toast.error("All properties must have names");
            return;
        }

        // Actualizar la lista de objetos guardados
        const newSavedObjects = [
            ...savedObjects.filter(obj => obj.name !== objectName),
            { name: objectName, data: properties }
        ];
        
        setSavedObjects(newSavedObjects);
        localStorage.setItem('customObjects', JSON.stringify(newSavedObjects));
        toast.success(`Object "${objectName}" saved successfully`);
    };

    // Cargar un objeto guardado
    const loadObject = (name: string) => {
        const objectToLoad = savedObjects.find(obj => obj.name === name);
        if (objectToLoad) {
            setObjectName(name);
            setProperties(objectToLoad.data);
            toast.info(`Object "${name}" loaded`);
        }
    };

    // Eliminar un objeto guardado
    const deleteObject = (name: string) => {
        const updated = savedObjects.filter(obj => obj.name !== name);
        setSavedObjects(updated);
        localStorage.setItem('customObjects', JSON.stringify(updated));
        toast.success(`Object "${name}" deleted`);
    };

    return (
        <>
            <div className="flex mb-4 gap-2">
                <Input 
                    placeholder="Object name" 
                    value={objectName} 
                    onChange={e => setObjectName(e.target.value)}
                    className="max-w-xs"
                />
                <Button onClick={saveObject} className="flex items-center gap-1">
                    <Save className="h-4 w-4" />
                    Save
                </Button>
            </div>
            <ScrollArea className="h-96 rounded-md border p-4">
            {/* Propiedades del objeto */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Properties</h3>
                {properties.map(prop => (
                    <PropertyEditor 
                        key={prop.id}
                        property={prop}
                        onChange={(updated) => updateProperty(prop.id, updated)}
                        onDelete={() => deleteProperty(prop.id)}
                    />
                ))}
                <Button 
                    onClick={addProperty}
                    variant="outline"
                    className="flex items-center gap-1"
                >
                    <Plus className="h-4 w-4" />
                    Add Property
                </Button>
            </div>
            </ScrollArea>
            {/* Objetos guardados */}
            {savedObjects.length > 0 && (
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Saved Objects</h3>
                    <div className="flex flex-wrap gap-2">
                        {savedObjects.map(obj => (
                            <div key={obj.name} className="flex gap-2 items-center">
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => loadObject(obj.name)}
                                >
                                    {obj.name}
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => deleteObject(obj.name)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Vista previa del JSON */}
            <div className="bg-background p-4 rounded-md font-mono text-sm overflow-auto max-h-[400px] border border-border">
                <pre className="w-full">{jsonOutput}</pre>
            </div>
        </>
    )
}

export default TableContent
