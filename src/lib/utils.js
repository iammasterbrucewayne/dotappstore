import { signIn } from "next-auth/react";
const { decodeAddress, signatureVerify } = require("@polkadot/util-crypto");
const { u8aToHex } = require("@polkadot/util");

export async function getSignature(account, callbackUrl) {
  try {
    const signer = account.wallet.signer;
    const { signature } = await signer.signRaw({
      type: "payload",
      data: `Login to dotappstore using ${account.address}`,
      address: account.address,
    });
    await signIn("credentials", {
      address: account.address.toString(),
      message: `Login to dotappstore using ${account.address}`,
      signature: signature.toString(),
      callbackUrl: callbackUrl,
    });
  } catch (err) {
    alert("Error while signing");
  }
}

export async function upload(file) {
  return new Promise((resolve, reject) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;
    const unsignedUploadPreset = process.env.NEXT_PUBLIC_PRESET;

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    const fd = new FormData();
    fd.append("upload_preset", unsignedUploadPreset);
    fd.append("file", file);

    fetch(url, {
      method: "POST",
      body: fd,
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data.secure_url);
      })
      .catch((error) => {
        reject(error);
        alert("Error while uploading");
      });
  });
}

export function isValidSignature(signedMessage, signature, address) {
  const publicKey = decodeAddress(address);
  const hexPublicKey = u8aToHex(publicKey);

  return signatureVerify(signedMessage, signature, hexPublicKey).isValid;
}

export async function upvote({ projectID, userID }) {
  try {
    const response = await fetch("/api/upvote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectID, userID }),
    });

    if (!response.ok) {
      alert("An error occurred while upvoting. Please try again.");
    }
  } catch (error) {
    alert("An unexpected error occurred. Please try again.");
  }
}

export async function report({ projectID, userID, reportType }) {
  try {
    const response = await fetch("/api/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectID, userID, reportType }),
    });

    if (!response.ok) {
      alert("An error occurred while reporting. Please try again.");
    }
  } catch (error) {
    alert("An unexpected error occurred. Please try again.");
  }
}

export async function downvote({ projectID, userID }) {
  try {
    const response = await fetch("/api/downvote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectID, userID }),
    });

    if (!response.ok) {
      alert("An error occurred while upvoting. Please try again.");
    }
  } catch (error) {
    alert("An unexpected error occurred. Please try again.");
  }
}

export function sanitizeTwitterUsername(username) {
  if (username.startsWith("@")) {
    return username.slice(1);
  }
  return username;
}
