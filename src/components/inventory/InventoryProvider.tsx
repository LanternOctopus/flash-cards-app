import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

// Inventory item type
interface InventoryItem {
    name: string;
    quantity: number;
}

// Context type
interface InventoryContextType {
    // Gold
    getGold: () => number;
    addGold: (amount: number) => void;
    subtractGold: (amount: number) => void;

    // Inventory
    getInventory: () => InventoryItem[];
    addToInventory: (
        name: string,
        quantity?: number,
    ) => void;
    removeFromInventory: (
        name: string,
        quantity?: number,
    ) => void;
    hasItem: (name: string, quantity?: number) => boolean;
}

// Keys for localStorage
const GOLD_KEY = "gold_amount";
const Inventory_KEY = "Inventory_items";

// Create context
const InventoryContext = createContext<
    InventoryContextType | undefined
>(undefined);

// Provider
export const InventoryProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [gold, setGold] = useState<number>(0);
    const [inventory, setInventory] = useState<
        InventoryItem[]
    >([]);

    // Load from localStorage on mount
    useEffect(() => {
        const storedGold = localStorage.getItem(GOLD_KEY);
        const storedInventory =
            localStorage.getItem(Inventory_KEY);

        if (storedGold) setGold(parseInt(storedGold, 10));
        if (storedInventory)
            setInventory(JSON.parse(storedInventory));
    }, []);

    // Save gold to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(GOLD_KEY, gold.toString());
    }, [gold]);

    // Save chest to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(
            Inventory_KEY,
            JSON.stringify(inventory),
        );
    }, [inventory]);

    // --- Gold functions ---
    const getGold = () => gold;
    const addGold = (amount: number) => {
        if (amount > 0) setGold((prev) => prev + amount);
    };
    const subtractGold = (amount: number) => {
        if (amount > 0 && amount <= gold)
            setGold((prev) => prev - amount);
    };

    // --- Inventory functions ---
    const getInventory = () => inventory;

    const addToInventory = (
        name: string,
        quantity: number = 1,
    ) => {
        setInventory((prev) => {
            const existing = prev.find(
                (i) => i.name === name,
            );
            if (existing) {
                // return new array with updated quantity
                return prev.map((i) =>
                    i.name === name
                        ? {
                              ...i,
                              quantity:
                                  i.quantity + quantity,
                          }
                        : i,
                );
            } else {
                return [...prev, { name, quantity }];
            }
        });
    };

    const removeFromInventory = (
        name: string,
        quantity: number = 1,
    ) => {
        setInventory((prev) => {
            return prev.flatMap((i) => {
                if (i.name !== name) return [i];
                const newQty = i.quantity - quantity;
                return newQty > 0
                    ? [{ ...i, quantity: newQty }]
                    : [];
            });
        });
    };

    // --- Quest helper ---
    const hasItem = (
        name: string,
        quantity: number = 1,
    ) => {
        const item = inventory.find((i) => i.name === name);
        return item ? item.quantity >= quantity : false;
    };

    return (
        <InventoryContext.Provider
            value={{
                getGold,
                addGold,
                subtractGold,
                getInventory,
                addToInventory,
                removeFromInventory,
                hasItem,
            }}
        >
            {children}
        </InventoryContext.Provider>
    );
};

// Hook
export const useInventory = () => {
    const context = useContext(InventoryContext);
    if (!context)
        throw new Error(
            "useInventory must be used within InventoryProvider",
        );
    return context;
};
