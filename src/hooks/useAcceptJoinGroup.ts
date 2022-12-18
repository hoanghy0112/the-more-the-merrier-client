export default function useJoinGroup(groupID: string) {
  function accept() {}
  function reject() {}

  return { accept, reject };
}
