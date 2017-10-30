/* SystemJS module definition */
declare var module: NodeModule;

interface NodeModule {
  id: string;
}

/* JSON module definition */
declare module "*.json" {
  const _: any
  export default _
}
