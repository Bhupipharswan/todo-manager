import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateTodo } from "../api/todoApi";

export function useUpdateTodo() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, todo}) => 
            updateTodo(id, todo),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["todos"],
            });

            queryClient.invalidateQueries({
                queryKey: ["todo", variables.id],
            });
        },
    });
}