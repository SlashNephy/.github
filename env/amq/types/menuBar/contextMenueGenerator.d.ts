declare function ContextMenueGenerator(): void
declare class ContextMenueGenerator {
  menuOpen: boolean
  _itemFields: {
    Chat: (player: any) => {
      name: string
      callback: () => void
    }
    InviteToGame: (player: any) => {
      name: string
      callback: () => void
    }
    FriendRequest: (player: any) => {
      name: string
      callback: () => void
    }
    Block: (player: any) => {
      name: string
      callback: () => void
    }
    Report: (player: any) => {
      name: string
      callback: () => void
    }
    RemoveFriend: (player: any) => {
      name: string
      callback: () => void
    }
    JoinGame: (player: any) => {
      name: string
      callback: () => void
    }
    InspectGame: (player: any) => {
      name: string
      callback: () => void
    }
  }
  generateStandardContextMenu($entry: any, selector: any, player: any, trigger?: string): void
  generateFriendListContextMenu($entry: any, selector: any, player: any, trigger?: string): void
  generatePlayerItemsObject(itemFieldList: any, player: any): {}
  generateNonPlayerItemsObject(itemFieldList: any): {}
  generateSocialStatusContextMenu($entry: any, selector: any, trigger?: string): void
  createClickTrigger($element: any): void
}
declare let contextMenueGenerator: ContextMenueGenerator
