import { highlightCode } from "@/lib/highlight";

const TOKENS = [
  "left <= right",
  "mid=(l+r)/2",
  "arr[mid]==target",
  "return mid",
  "left=mid+1",
  "right=mid-1",
  "arr[++top]=x",
  "s.push(10)",
  "s.pop()",
  "new Node(data)",
  "last.next=newNode",
  "list.insert(10)",
  "inventory.get(x)",
  "self.next=None",
  "current.next",
  "ll.append(10)",
  "class Node",
  "isEmpty()",
  "O(n log n)",
  "O(log n)",
  "BFS(root)",
  "DFS(node)",
  "queue.push(x)",
  "stack.pop()",
  "#include <iostream>",
  "int main() {",
  "std::cout <<",
  "return 0;",
];

function seededRandom(seed: number) {
  const x = Math.sin(seed * 999) * 10000;
  return x - Math.floor(x);
}

const COUNT = 15;

const DROPS = Array.from({ length: COUNT }, (_, i) => {
  const left = 2 + seededRandom(i * 1.7 + 1) * 96;
  const duration = 16 + seededRandom(i * 5.1 + 3) * 12;
  const delay = seededRandom(i * 3.3 + 2) * 14;
  const opacity = 0.05 + seededRandom(i * 11 + 5) * 0.05;
  const size = 11 + Math.floor(seededRandom(i * 13 + 6) * 3);
  return { token: TOKENS[i % TOKENS.length], left, duration, delay, opacity, size };
});

export function CodeFall() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      {DROPS.map((d, i) => (
        <span
          key={i}
          className="code-fall-token decor-text font-mono whitespace-nowrap blur-[0.5px]"
          style={{
            left: `${d.left}%`,
            fontSize: d.size,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
            // @ts-expect-error custom property for the keyframe animation
            "--op": d.opacity,
          }}
        >
          {highlightCode(d.token)}
        </span>
      ))}
    </div>
  );
}
