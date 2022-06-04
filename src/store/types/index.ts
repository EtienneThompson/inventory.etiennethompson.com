export type InventoryStore = {
  isLoading: boolean;
  changingElement: boolean;
  clientId: string | undefined;
  isUser: boolean;
  isAdmin: boolean;
  isLoggedIn: boolean;
  currentState: SystemState;
};

export enum SystemState {
  Viewing = "Viewing",
  Moving = "Moving",
}
