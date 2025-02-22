export type NavbarOption = {
  name: string,
  icon: any,
  id?: string,
  action?: () => void,
  active?: boolean | undefined,
  visible?: boolean | undefined,
  mobile?: boolean | undefined,
  link: string,
}

export type SidebarConfig = {
  main: NavbarOption[],
  extra: NavbarOption[]
}

export type NavbarConfig = {
  top: NavbarOption[]
  bottom: NavbarOption[],
}

