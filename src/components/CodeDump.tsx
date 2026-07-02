"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { highlightCode } from "@/lib/highlight";
import { useThemeOpacityBoost } from "@/lib/useThemeOpacityBoost";

const TOKENS = [
  "left <= right",
  "mid=(l+r)/2",
  "arr[mid]==target",
  "return mid",
  "left=mid+1",
  "right=mid-1",
  "return -1",
  "arr[++top]=x",
  "top>=MAX-1",
  "arr[top--]",
  "top<0",
  "s.push(10)",
  "s.pop()",
  "s.peek()",
  "new Node(data)",
  "head=newNode",
  "last.next=newNode",
  "last.next!=null",
  "list.insert(10)",
  "inventory.put(x,y)",
  "inventory.get(x)",
  "containsKey(x)",
  "self.data=data",
  "self.next=None",
  "not self.head",
  "current.next",
  "ll.append(10)",
  "def display()",
  "def __init__()",
  "class Node",
  "class Stack",
  "top=-1",
  "isEmpty()",
  "printList()",
  "for(i=0;i<n;i++)",
  "while(l<=r)",
  "if(arr[i]>arr[j])",
  "swap(a[i],a[j])",
  "return dp[n]",
  "O(n log n)",
  "O(log n)",
  "O(n^2)",
  "visited[node]=true",
  "queue.push(x)",
  "stack.pop()",
  "head->next",
  "root->left",
  "root->right",
  "dp[i][j]+=dp[i-1][j]",
  "map.get(key)",
  "arr.sort()",
  "BFS(root)",
  "DFS(node)",
  "n & (n-1)",
  "a ^ b ^ c",
  "heap.push(x)",
  "graph[u].push(v)",
  "memo[n]=res",
  "low=mid+1",
  "high=mid-1",
  "i++, j--",
  "base case",
  "fast=fast->next->next",
  "return true",
  "return false",
  "int x = 0",
  "let sum = 0",
  "const arr = []",
  "n = len(arr)",
  "arr.length",
  "i < n; i++",
  "j = i + 1",
  "temp = a[i]",
  "a[i] = a[j]",
  "a[j] = temp",
  "if not visited",
  "queue.pop(0)",
  "stack.append(x)",
  "res = []",
  "res.append(x)",
  "return res",
  "count += 1",
  "total = 0",
  "max(a, b)",
  "min(a, b)",
  "abs(a - b)",
  "n % 2 == 0",
  "n / 2",
  "n * n",
  "pow(2, n)",
  "sqrt(n)",
  "arr[0]",
  "arr[n-1]",
  "arr.size()",
  "vector<int> v",
  "int arr[100]",
  "String s = \"\"",
  "s.length()",
  "s.charAt(i)",
  "s[i] == s[j]",
  "Map<K,V>",
  "List<Integer>",
  "new ArrayList<>()",
  "public void run()",
  "private int x",
  "static int count",
  "try { } catch",
  "throw new Error",
  "null check",
  "if (x == null)",
  "x != undefined",
  "typeof x",
  "x instanceof Node",
  "super(x)",
  "this.left = null",
  "this.right = null",
  "root == null",
  "node.val",
  "node.next = null",
  "prev = curr",
  "curr = curr.next",
  "slow = slow.next",
  "fast = fast.next.next",
  "hashSet.add(x)",
  "hashSet.has(x)",
  "dict[key] = val",
  "key in dict",
  "for key, val in dict",
  "sorted(arr)",
  "arr.reverse()",
  "return len(arr)",
  "#include <iostream>",
  "int main() {",
  "std::cout <<",
  "std::endl;",
  "return 0;",
  "Thank you so much!",
];

// non-blank lines of the program; each is carried back by one returning token
const CARRIER_LINES = [
  "#include <iostream>",
  "int main() {",
  '    std::cout << "Thank you so much!" << std::endl;',
  "    return 0;",
  "}",
];
// which vertical row each carrier line sits on (row 1 is left blank, like the real program)
const ROW_FOR_LINE = [0, 2, 3, 4, 5];
const TOTAL_ROWS = 6;
const LINE_HEIGHT = 24;
const BLOCK_LEFT_OFFSET = 150;

const COLUMNS = 32;
const ITEM_HEIGHT = 10;
const MAX_ITEMS = 320; // deliberately large — the pile takes a long time to approach the navbar
const FALL_SPEED = 90; // px per second — slow, readable fall
const JUNK_DURATION = 4.8; // slow arrow-like glide to the wall, then a dead-weight fall
const VANISH_IN_PLACE_CHANCE = 0.35; // a portion just fade out where they are, breaking up the group motion
const CARRIER_BASE_DURATION = 2.6;
const CARRIER_STAGGER = 0.75; // each line arrives this much later than the previous one
const HOLD_MS = 3000; // how long the assembled program stays on screen
const NAV_HEIGHT = 80;
const FALLBACK_PILE_HEIGHT = 600;
const HELPER_COUNT = 4;

function seededRandom(seed: number) {
  const x = Math.sin(seed * 999) * 10000;
  return x - Math.floor(x);
}

function radialHit(x0: number, y0: number, width: number, height: number, angle: number) {
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);
  const tX = dx > 0 ? (width - x0) / dx : dx < 0 ? (0 - x0) / dx : Infinity;
  const tY = dy > 0 ? (height - y0) / dy : dy < 0 ? (0 - y0) / dy : Infinity;
  const t = Math.max(0, Math.min(tX, tY));
  return { hitX: dx * t, hitY: dy * t };
}

function pickHelperSlots(seed: number) {
  const slots = new Set<number>();
  let i = 0;
  while (slots.size < HELPER_COUNT) {
    slots.add(4 + Math.floor(seededRandom(seed * 7 + i * 13 + 3) * 46));
    i += 1;
  }
  return slots;
}

type DumpItem = {
  id: number;
  token: string;
  left: number;
  bottom: number;
  startY: number;
  size: number;
  rotation: number;
  opacity: number;
  fallDuration: number;
  wiggleDuration: number;
  wiggleDelay: number;
  isHelper: boolean;
};

type ReleaseTarget = {
  hitX: number;
  hitY: number;
  isCarrier: boolean;
  lineIndex: number;
  // junk fields
  vanishInPlace: boolean;
  fallY: number;
  spin: number;
  duration: number;
  // carrier fields
  slotX: number;
  slotY: number;
};

let uid = 0;

export function CodeDump() {
  const reduceMotion = useReducedMotion();
  const opacityBoost = useThemeOpacityBoost();
  const dim = (o: number) => Math.min(1, o * opacityBoost);
  const [items, setItems] = useState<DumpItem[]>([]);
  const [releasing, setReleasing] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [pileHeight, setPileHeight] = useState(FALLBACK_PILE_HEIGHT);
  const columnHeights = useRef<number[]>(new Array(COLUMNS).fill(0));
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const spawnCount = useRef(0);
  const helperSlots = useRef<Set<number>>(pickHelperSlots(1));
  const resetSeed = useRef(1);
  const releaseTargets = useRef<Record<number, ReleaseTarget>>({});
  const originRef = useRef({ left: 0, top: 0, height: FALLBACK_PILE_HEIGHT });
  const pileHeightRef = useRef(FALLBACK_PILE_HEIGHT);
  const releaseTimeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  function scheduleReleaseTimeout(fn: () => void, ms: number) {
    const id = setTimeout(fn, ms);
    releaseTimeouts.current.push(id);
    return id;
  }

  function cancelRelease() {
    releaseTimeouts.current.forEach(clearTimeout);
    releaseTimeouts.current = [];
    document.body.classList.remove("code-fall-paused");
    columnHeights.current = new Array(COLUMNS).fill(0);
    resetSeed.current += 1;
    helperSlots.current = pickHelperSlots(resetSeed.current);
    spawnCount.current = 0;
    setReleasing(false);
    setShowThanks(false);
    setItems([]);
  }

  // scrolling up away from the pile cancels the release/thank-you sequence
  // instead of letting it keep showing in the background
  useEffect(() => {
    if (!releasing && !showThanks) return;

    let lastY = window.scrollY;
    function handleScroll() {
      const y = window.scrollY;
      if (y < lastY - 10) {
        cancelRelease();
      }
      lastY = y;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [releasing, showThanks]);

  useEffect(() => {
    function updateHeight() {
      const next = Math.max(360, window.innerHeight - NAV_HEIGHT);
      pileHeightRef.current = next;
      setPileHeight(next);
    }
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    if (reduceMotion || releasing || showThanks) return;

    let cancelled = false;

    function spawn() {
      if (cancelled) return;
      const containerWidth = containerRef.current?.clientWidth ?? 900;

      setItems((prev) => {
        if (prev.length >= MAX_ITEMS) return prev;
        uid += 1;
        spawnCount.current += 1;
        const s1 = seededRandom(uid * 1.3);
        const s2 = seededRandom(uid * 2.7 + 11);
        const s3 = seededRandom(uid * 4.1 + 23);
        const s4 = seededRandom(uid * 6.7 + 31);
        // averaging 4 random picks pulls the column toward the center more sharply,
        // giving a single peak with a wide base — a mountain, not a rounded mound
        const col = Math.floor(((s1 + s2 + s3 + s4) / 4) * COLUMNS);
        const colWidth = containerWidth / COLUMNS;
        const bottom = columnHeights.current[col];
        columnHeights.current[col] = bottom + ITEM_HEIGHT;

        const fallDistance = pileHeightRef.current - bottom;
        const isHelper = helperSlots.current.has(spawnCount.current);

        const item: DumpItem = {
          id: uid,
          token: TOKENS[uid % TOKENS.length],
          // small jitter only — enough to look organic without drifting the item off
          // the column footprint it was actually stacked against (which looked like
          // pieces floating with gaps beneath them)
          left: col * colWidth + colWidth / 2 + (seededRandom(uid * 5.9) - 0.5) * colWidth * 0.25,
          bottom,
          startY: -(fallDistance + 20),
          size: isHelper ? 12 : 10 + Math.floor(seededRandom(uid * 7.3) * 3),
          rotation: (seededRandom(uid * 9.1) - 0.5) * 16,
          opacity: isHelper ? 0.6 : 0.18 + seededRandom(uid * 6.2) * 0.14,
          fallDuration: Math.max(0.8, fallDistance / FALL_SPEED),
          wiggleDuration: 2.6 + seededRandom(uid * 4.4) * 2.2,
          wiggleDelay: seededRandom(uid * 1.9) * 2,
          isHelper,
        };
        return [...prev, item];
      });
      timeoutRef.current = setTimeout(spawn, 700 + Math.random() * 700);
    }

    timeoutRef.current = setTimeout(spawn, 500);

    return () => {
      cancelled = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [reduceMotion, releasing, showThanks]);

  function handleRelease() {
    if (releasing || items.length === 0) return;

    const rect = containerRef.current?.getBoundingClientRect();
    originRef.current = {
      left: rect?.left ?? 0,
      top: rect?.top ?? 0,
      height: rect?.height ?? pileHeightRef.current,
    };

    const width = window.innerWidth;
    const height = window.innerHeight;
    const centerX = width / 2 - BLOCK_LEFT_OFFSET;
    const centerY = height / 2 - ((TOTAL_ROWS - 1) / 2) * LINE_HEIGHT;

    // pick a handful of tokens, spread across the pile, to carry each line of the program back
    const numCarriers = Math.min(CARRIER_LINES.length, items.length);
    const carrierIds = new Set<number>();
    for (let i = 0; i < numCarriers; i++) {
      const idx = Math.min(items.length - 1, Math.floor(((i + 0.5) * items.length) / numCarriers));
      carrierIds.add(items[idx].id);
    }
    const carrierLineForId = new Map<number, number>();
    Array.from(carrierIds).forEach((id, i) => carrierLineForId.set(id, i));

    const targets: Record<number, ReleaseTarget> = {};
    items.forEach((item) => {
      const x0 = originRef.current.left + item.left;
      const y0 = originRef.current.top + (originRef.current.height - item.bottom);
      // a true random angle per item spreads everyone toward different points on the
      // screen edge instead of clustering into a handful of shared directions
      const angle = seededRandom(item.id * 13.7) * Math.PI * 2;
      const { hitX, hitY } = radialHit(x0, y0, width, height, angle);

      const lineIndex = carrierLineForId.get(item.id);
      const isCarrier = lineIndex !== undefined;

      if (isCarrier) {
        const row = ROW_FOR_LINE[lineIndex as number];
        targets[item.id] = {
          hitX,
          hitY,
          isCarrier: true,
          lineIndex: lineIndex as number,
          vanishInPlace: false,
          fallY: 0,
          spin: 0,
          duration: CARRIER_BASE_DURATION + (lineIndex as number) * CARRIER_STAGGER,
          slotX: centerX - x0,
          slotY: centerY + row * LINE_HEIGHT - y0,
        };
      } else {
        // once it reaches the wall it loses all momentum and just drops — a dead fall,
        // no more sideways drift — and roughly a third just fade out where they stand
        const vanishInPlace = seededRandom(item.id * 15.5) < VANISH_IN_PLACE_CHANCE;
        const fallY = height - (originRef.current.top + (originRef.current.height - item.bottom) + hitY) + 200;
        targets[item.id] = {
          hitX,
          hitY,
          isCarrier: false,
          lineIndex: -1,
          vanishInPlace,
          fallY,
          spin: (seededRandom(item.id * 2.2) - 0.5) * 60,
          duration: vanishInPlace
            ? 0.9 + seededRandom(item.id * 4.4) * 0.9
            : JUNK_DURATION + seededRandom(item.id * 3.1) * 1.2,
          slotX: 0,
          slotY: 0,
        };
      }
    });
    releaseTargets.current = targets;

    releaseTimeouts.current.forEach(clearTimeout);
    releaseTimeouts.current = [];

    setReleasing(true);
    document.body.classList.add("code-fall-paused");
    scheduleReleaseTimeout(() => document.body.classList.remove("code-fall-paused"), 20000);

    const lastArrival = CARRIER_BASE_DURATION + (CARRIER_LINES.length - 1) * CARRIER_STAGGER;
    const activeMs = lastArrival * 1000 + 200;

    scheduleReleaseTimeout(() => {
      setReleasing(false);
      setShowThanks(true);
    }, activeMs);

    scheduleReleaseTimeout(() => {
      columnHeights.current = new Array(COLUMNS).fill(0);
      resetSeed.current += 1;
      helperSlots.current = pickHelperSlots(resetSeed.current);
      spawnCount.current = 0;
      setShowThanks(false);
      setItems([]);
    }, activeMs + HOLD_MS);
  }

  return (
    <div>
      <div ref={containerRef} className="relative overflow-hidden" style={{ height: pileHeight }}>
        {!releasing &&
          !showThanks &&
          items.map((item) => (
            <span
              key={item.id}
              className="code-item-wiggle decor-text absolute font-mono whitespace-nowrap"
              style={{
                left: item.left,
                bottom: item.bottom,
                fontSize: item.size,
                animationDuration: `${item.wiggleDuration}s`,
                animationDelay: `${item.fallDuration + item.wiggleDelay}s`,
                animationPlayState: reduceMotion ? "paused" : "running",
                pointerEvents: item.isHelper ? "auto" : "none",
                cursor: item.isHelper ? "pointer" : "default",
                border: item.isHelper ? "1px solid var(--border-strong)" : undefined,
                borderRadius: item.isHelper ? 4 : undefined,
                padding: item.isHelper ? "1px 4px" : undefined,
              }}
              onClick={item.isHelper ? handleRelease : undefined}
            >
              <span
                className={item.isHelper ? "code-helper-pulse" : undefined}
                style={{ display: "inline-block" }}
              >
                <motion.span
                  style={{ display: "inline-block" }}
                  initial={{ y: item.startY, opacity: 0 }}
                  animate={{
                    opacity: dim(item.opacity),
                    y: 0,
                    rotate: item.rotation,
                    transition: { duration: item.fallDuration, ease: "easeIn" },
                  }}
                >
                  {highlightCode(item.token)}
                </motion.span>
              </span>
            </span>
          ))}
      </div>

      {(releasing || showThanks) && (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
          {items.map((item) => {
            const target = releaseTargets.current[item.id];
            if (!target) return null;
            const absLeft = originRef.current.left + item.left;
            const absTop = originRef.current.top + (originRef.current.height - item.bottom);
            const opacity = dim(item.opacity);
            const restOpacity = Math.max(opacity, dim(0.4));

            return (
              <motion.span
                key={item.id}
                className="decor-text absolute font-mono whitespace-nowrap"
                style={{ left: absLeft, top: absTop, fontSize: target.isCarrier ? 13 : item.size }}
                initial={{ opacity, rotate: item.rotation }}
                animate={
                  target.isCarrier
                    ? {
                        // stays dim the whole way through — no brighten on the hit
                        opacity: [opacity, opacity, restOpacity],
                        x: [0, target.hitX, target.slotX],
                        y: [0, target.hitY, target.slotY],
                        rotate: [item.rotation, item.rotation * 0.3, 0],
                        transition: {
                          duration: target.duration,
                          times: [0, 0.35, 1],
                          ease: ["easeOut", "easeInOut"],
                        },
                      }
                    : target.vanishInPlace
                      ? {
                          // some just fade out right where they stand, instead of everything
                          // travelling together like a single group
                          opacity: [opacity, 0],
                          y: [0, -8],
                          transition: {
                            duration: target.duration,
                            delay: (item.id % 30) * 0.03,
                            ease: "easeOut",
                          },
                        }
                      : {
                          // a slow, straight arrow-like glide to the wall, then it loses all
                          // momentum and just drops — a dead fall, no more sideways drift
                          opacity: [opacity, opacity, 0],
                          x: [0, target.hitX, target.hitX],
                          y: [0, target.hitY, target.fallY],
                          rotate: [item.rotation, item.rotation + target.spin, item.rotation + target.spin],
                          transition: {
                            duration: target.duration,
                            delay: (item.id % 30) * 0.03,
                            times: [0, 0.55, 1],
                            ease: ["easeInOut", "easeIn"],
                          },
                        }
                }
              >
                {target.isCarrier
                  ? highlightCode(CARRIER_LINES[target.lineIndex])
                  : highlightCode(item.token)}
              </motion.span>
            );
          })}
        </div>
      )}
    </div>
  );
}
