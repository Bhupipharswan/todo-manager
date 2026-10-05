import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addTodo } from "../api/todoApi";

export function useAddTodo() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addTodo,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["todos"],
            });
        },
    });
}