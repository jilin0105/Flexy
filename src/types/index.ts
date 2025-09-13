export interface Component {
  id: string;
  type: string;
  content: string;
  styles: {
    [key: string]: string | number;
  };
  children?: Component[];
}

export interface AppState {
  components: Component[];
  selectedComponent: string | null;
  previewMode: boolean;
}

export interface ComponentType {
  name: string;
  type: string;
  icon: JSX.Element;
  defaultStyles: {
    [key: string]: string | number;
  };
}