export default function stripIPFSPrefix(str: string): string {
  return str.replaceAll("ipfs://", "").replaceAll("ipfs/", "");
}
