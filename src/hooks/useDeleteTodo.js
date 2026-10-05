import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteTodo } from "../api/todoApi";

export function useDeleteTodo() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTodo,

        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: ["todos"],
            });

            queryClient.removeQueries({
                queryKey: ["todo", id],
            });
        },
    });
}