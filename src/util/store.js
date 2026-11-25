import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


export const useCartStore = create(
    persist(
        (set, get) => ({
            // начальное состояние
            cart: [],

            // метод для добавления товара в корзину
            addToCart: (item) => {
                const { cart } = get();
                const itemInCart = cart.find((i) => i.id === item.id);
                const newCart = itemInCart
                    ? cart.map((i) =>
                        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                    )
                    : [...cart, { ...item, quantity: 1 }];
                set({ cart: newCart });
            },
            // метод для удаления товара из корзины
            removeItem: (id) => {
                const newCart = get().cart.filter((i) => i.id !== id);
                set({ cart: newCart });
            },
            // метод для увеличения количества товара, находящегося в корзине
            incrementQuantity: (id) => {
                const newCart = get().cart.map((i) =>
                    i.id === id ? { ...i, quantity: i.quantity + 1 } : i
                );
                set({ cart: newCart });
            },
            // метод для уменьшения количества товара, находящегося в корзине
            decrementQuantity: (id) => {
                const newCart = get().cart.map((i) =>
                    i.id === id ? { ...i, quantity: i.quantity - 1 } : i
                );
                set({ cart: newCart });
            },

            // дополнительно
            // метод для получения общего количества наименований товаров, находящихся в корзине
            getTotalItems: () => get().cart.length,
            // метод для получения общего количества товаров, находящихся в корзине
            getTotalQuantity: () => get().cart.reduce((x, y) => x + y.quantity, 0),
            // метод для получения общей стоимости товаров, находящихся в корзине
            getTotalPrice: () => get().cart.reduce((x, y) => x + y.price * y.quantity, 0),
        }),
        {
            name: 'app-settings', // Ключ в localStorage
            storage: createJSONStorage(() => localStorage), // Хранилище (по умолчанию localStorage)
        }
    )
);