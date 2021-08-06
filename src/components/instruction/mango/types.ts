import { PublicKey, TransactionInstruction } from "@solana/web3.js";
// import { create, number, optional, string, type } from "superstruct";

const MANGO_PROGRAM_IDS = [
    "4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn", //5fNfvyp5czQVX77yoACa3JJVEhdRaWjPuazuWgjhTqEH, probably different for everyone bc of margin accounts??
    "9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin",
    "5fNfvyp5czQVX77yoACa3JJVEhdRaWjPuazuWgjhTqEH",
    "JD3bq9hGdy38PuWQ4h2YJpELmHVGPPfFSuFkpzAd9zfu"
  ];

  // 0: "Initialize Mango Group",
  export type InitializeMarginAccount = {
    mangoGroup: PublicKey;
    programId: PublicKey;
    marginAccount: PublicKey;
    owner: PublicKey;
  }

  export const decodeInitializeMarginAccount = (ix: TransactionInstruction): InitializeMarginAccount => {
  
    const initializeMarginAccount: InitializeMarginAccount = {
      mangoGroup: ix.keys[0].pubkey,
      programId: ix.programId,
      marginAccount: ix.keys[1].pubkey,
      owner: ix.keys[2].pubkey,
    };
  
    return initializeMarginAccount;
  };

  export type Deposit = {
    mangoGroup: PublicKey;
    programId: PublicKey;
    marginAccount: PublicKey;
    owner: PublicKey;
    ownerToken: PublicKey;
    vault: PublicKey;
  };
  
  export const decodeDeposit = (ix: TransactionInstruction): Deposit => {
  
    const deposit: Deposit = {
      mangoGroup: ix.keys[0].pubkey,
      programId: ix.programId,
      marginAccount: ix.keys[1].pubkey,
      owner: ix.keys[2].pubkey,
      ownerToken: ix.keys[3].pubkey,
      vault: ix.keys[4].pubkey,
    };
  
    return deposit;
  };

  export type Withdraw = {
    mangoGroup: PublicKey;
    programId: PublicKey;
    marginAccount: PublicKey;
    owner: PublicKey;
    ownerToken: PublicKey;
    vault: PublicKey;
    signer: PublicKey;
    openOrdersAccounts: PublicKey[];
    oracles: PublicKey[];
  };
  
  export const decodeWithdraw = (ix: TransactionInstruction): Withdraw => {

    const numMarkets = (ix.keys.length - 8) / 2; // TODO: Do not love the magic numbers :/ (maybe refactor num markets?)
    const pubkeys = ix.keys.map(o => o.pubkey);
  
    const withdraw: Withdraw = {
      mangoGroup: pubkeys[0],
      programId: ix.programId,
      marginAccount: pubkeys[1],
      owner: pubkeys[2],
      ownerToken: pubkeys[3],
      vault: pubkeys[4], // TODO: which vault??
      signer: pubkeys[5],
      openOrdersAccounts: pubkeys.slice(8, 8 + numMarkets),
      oracles: pubkeys.slice(8 + numMarkets)
    };
  
    return withdraw;
  };

  export type Borrow = {
    mangoGroup: PublicKey;
    programId: PublicKey;
    marginAccount: PublicKey;
    owner: PublicKey;
    openOrdersAccounts: PublicKey[];
    oracles: PublicKey[];
  };
  
  export const decodeBorrow = (ix: TransactionInstruction): Borrow => {

    const numMarkets = (ix.keys.length - 4) / 2;
    const pubkeys = ix.keys.map(o => o.pubkey);
  
    const borrow: Borrow = {
      mangoGroup: pubkeys[0],
      programId: ix.programId,
      marginAccount: pubkeys[1],
      owner: pubkeys[2],
      openOrdersAccounts: pubkeys.slice(4, 4 + numMarkets),
      oracles: pubkeys.slice(4 + numMarkets)
    };
  
    return borrow;
  };

  export type SettleBorrow = {
    mangoGroup: PublicKey;
    programId: PublicKey;
    marginAccount: PublicKey;
    owner: PublicKey;
  }
    
  
  export const decodeSettleBorrow = (ix: TransactionInstruction): SettleBorrow => {
  
    const settleBorrow: SettleBorrow = {
      mangoGroup: ix.keys[0].pubkey,
      programId: ix.programId,
      marginAccount: ix.keys[1].pubkey,
      owner: ix.keys[2].pubkey,
    };
  
    return settleBorrow;
  };

  // 6: "Liquidate",

  //Deposit and withdraw are exactly the same, should probably dedupe code, idk
  export type DepositSerum = {
    mangoGroup: PublicKey;
    programId: PublicKey;
    owner: PublicKey;
    userMangoSerumAccount: PublicKey;
    userSerumAccount: PublicKey;
    mangoSerumVault: PublicKey;
    signer: PublicKey;
  }
  
  export const decodeDepositSerum = (ix: TransactionInstruction): DepositSerum => {
  
    const depositSerum: DepositSerum = {
      mangoGroup: ix.keys[0].pubkey,
      programId: ix.programId,
      userMangoSerumAccount: ix.keys[1].pubkey,
      owner: ix.keys[2].pubkey,
      userSerumAccount: ix.keys[3].pubkey,
      mangoSerumVault: ix.keys[4].pubkey,
      signer: ix.keys[5].pubkey,
      // token_prog_acc: ix.keys[6].pubkey,
      // clock_acc: ix.keys[7].pubkey,
    };
  
    return depositSerum;
  };

  export type WithdrawSerum = {
    mangoGroup: PublicKey;
    programId: PublicKey;
    owner: PublicKey;
    userMangoSerumAccount: PublicKey;
    userSerumAccount: PublicKey;
    mangoSerumVault: PublicKey;
    signer: PublicKey;
  }
  
  export const decodeWithdrawSerum = (ix: TransactionInstruction): WithdrawSerum => {
  
    const withdrawSerum: WithdrawSerum = {
      mangoGroup: ix.keys[0].pubkey,
      programId: ix.programId,
      userMangoSerumAccount: ix.keys[1].pubkey,
      owner: ix.keys[2].pubkey,
      userSerumAccount: ix.keys[3].pubkey,
      mangoSerumVault: ix.keys[4].pubkey,
      signer: ix.keys[5].pubkey,
      // token_prog_acc: ix.keys[6].pubkey,
      // clock_acc: ix.keys[7].pubkey,
    };
  
    return withdrawSerum;
  };
  // 9: "Place Order",
  // 10: "Settle Funds",
  // 11: "Cancel Order",
  // 12: "Cancel Order By Client Id",
  // 13: "Change Borrow Limit",
  // 14: "Place And Settle",
  // 15: "Force Cancel Orders",
  // 16: "Partial Liquidate"
  
// Which one will work??? IDK
// export const isMangoInstruction = (
//     instruction: TransactionInstruction
//   ) => {
//     return instruction.programId.equals(MANGO_PROGRAM_ID);
//   };

export function isMangoInstruction(instruction: TransactionInstruction) {
return (
    MANGO_PROGRAM_IDS.includes(instruction.programId.toBase58()) 
);
}

export const MANGO_CODE_LOOKUP: { [key: number]: string } = { // Maybe I should wait until perps to push this? I guess it might only add 1 or 2
  0: "Initialize Mango Group",
  1: "Initialize Margin Account",
  2: "Deposit",
  3: "Withdraw",
  4: "Borrow",
  5: "Settle Borrow",
  6: "Liquidate",
  7: "Deposit Serum",
  8: "Withdraw Serum",
  9: "Place Order",
  10: "Settle Funds",
  11: "Cancel Order",
  12: "Cancel Order By Client Id",
  13: "Change Borrow Limit",
  14: "Place And Settle",
  15: "Force Cancel Orders",
  16: "Partial Liquidate"
};

export const parseMangoInstructionTitle = (
  instruction: TransactionInstruction
): string => {
  const code = instruction.data[0];
  console.log(code)
  console.log(MANGO_CODE_LOOKUP[code])

  if (!(code in MANGO_CODE_LOOKUP)) {
    throw new Error(`Unrecognized Mango Markets instruction code: ${code}`);
  }
  return MANGO_CODE_LOOKUP[code];
};