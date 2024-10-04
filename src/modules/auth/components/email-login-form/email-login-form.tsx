"use client";

import { Button, Stack, TextField } from "@mui/material";
import { signIn } from "next-auth/react";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => {
  return fetch(url, {
    method: "GET",
  }).then((res) => res.json());
};

export function EmailLoginForm() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const { data } = useSWR(`/api/validation/email?email=${email}`, fetcher);

  console.log("@@ data: ", data);

  if (submitted) {
    return (
      <div>
        <p>
          {`Check your email for a link to sign in. If it doesn't appear within a few minutes, check your spam folder.`}
        </p>
      </div>
    );
  }

  return (
    <form
      action="#"
      onSubmit={(e) => {
        e.preventDefault();
        signIn("email", { email: (e.target as any).email.value });
        setSubmitted(true);
      }}
    >
      <Stack direction="row" spacing={2}>
        <TextField
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          color={!data?.exists ? "success" : "error"}
        />
        {data?.exists && (
          <span>
            <small>Account exists</small>
          </span>
        )}
        <Button type="submit" variant="contained">
          <span>
            Submit <span aria-hidden="true">&rarr;</span>
          </span>
        </Button>
      </Stack>
    </form>
  );
}
