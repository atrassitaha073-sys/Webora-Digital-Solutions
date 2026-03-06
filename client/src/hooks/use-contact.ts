import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

type ContactInput = z.infer<typeof api.contact.submit.input>;

export function useSubmitContact() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: ContactInput) => {
      // Validate data against schema before sending
      console.log('📤 Form data before validation:', data);
      const validated = api.contact.submit.input.parse(data);
      console.log('✅ Validated data:', validated);
      
      const res = await fetch(api.contact.submit.path, {
        method: api.contact.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      console.log('📡 Server response status:', res.status);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('❌ Server error response:', errorText);
        
        if (res.status === 400) {
          try {
            const error = api.contact.submit.responses[400].parse(JSON.parse(errorText));
            throw new Error(error.message);
          } catch (e) {
            throw new Error(errorText || "Invalid input");
          }
        }
        throw new Error("Failed to send message: " + res.statusText);
      }
      
      const response = await res.json();
      console.log('✅ Success response:', response);
      return api.contact.submit.responses[201].parse(response);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "We'll get back to you shortly.",
        variant: "default",
      });
    },
    onError: (error) => {
      console.error('🔴 Mutation error:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
