import { useQuery } from "@tanstack/react-query";

import { getTodo } from "../api/todoApi";

export function useTodo(id) {
    return useQuery({
        queryKey: ["todo", id],
        queryFn: () => getTodo(id),
        enabled: !!id,
    });
}