import React from "react";
import { TransactionInstruction, SignatureResult } from "@solana/web3.js";
import { InstructionCard } from "./InstructionCard";
import { useCluster } from "providers/cluster";
import { reportError } from "utils/sentry";
import {
  // decodeInitializeMangoGroup,
  decodeInitializeMarginAccount,
  decodeDeposit,
  decodeWithdraw,
  decodeBorrow,
  decodeSettleBorrow,
//   decodeLiquidate,
  decodeDepositSerum,
  decodeWithdrawSerum,
//   decodePlaceOrder,
//   decodeCancelOrder,
//   decodeCancelOrderByClientId",
//   decodeChangeBorrowLimit,
//   decodePlaceAndSettle,
//   decodeForceCancelOrders,
//   decodePartialLiquidate,
} from "./mango/types";
// import { InitializeMangoGroupDetailsCard } from "./mango/InitializeMangoGroupDetailsCard";
import { InitializeMarginAccountDetailsCard } from "./mango/InitializeMarginAccountDetails";
import { DepositDetailsCard } from "./mango/DepositDetails";
import { WithdrawDetailsCard } from "./mango/WithdrawDetails";
import { BorrowDetailsCard } from "./mango/BorrowDetails";
import { SettleBorrowDetailsCard } from "./mango/SettleBorrowDetails";
//liquidate
import { DepositSerumDetailsCard } from "./mango/DepositSerumDetails";
import { WithdrawSerumDetailsCard } from "./mango/WithdrawSerumDetails";

import { parseMangoInstructionTitle } from "./mango/types";


export function MangoDetailsCard(props: {
  ix: TransactionInstruction;
  index: number;
  result: SignatureResult;
  signature: string;
  innerCards?: JSX.Element[];
  childIndex?: number;
}) {
  const { ix, index, result, signature, innerCards, childIndex } = props;

  const { url } = useCluster();


  let title;
  try {
    title = parseMangoInstructionTitle(ix);

    switch (title) {
      // case "Initialize Mango Group":
      //   return (
      //     <InitializeMangoGroupDetailsCard info={decodeInitializeMangoGroup(ix)} {...props} />
      //   );
      case "Initialize Margin Account":
        return (
          <InitializeMarginAccountDetailsCard info={decodeInitializeMarginAccount(ix)} {...props} />
        );
      case "Deposit":
        return (
          <DepositDetailsCard info={decodeDeposit(ix)} {...props} />
        );
      case "Withdraw":
        return (
          <WithdrawDetailsCard info={decodeWithdraw(ix)} {...props} />
        );
      case "Borrow":
        return (
          <BorrowDetailsCard info={decodeBorrow(ix)} {...props} />
        );
      case "Settle Borrow":
        return (
          <SettleBorrowDetailsCard info={decodeSettleBorrow(ix)} {...props} />
        );
          // 6: "Liquidate",
      case "Deposit Serum":
        return (
          <DepositSerumDetailsCard info={decodeDepositSerum(ix)} {...props} />
        );
      case "Withdraw Serum":
        return (
          <WithdrawSerumDetailsCard info={decodeWithdrawSerum(ix)} {...props} />
        );
  // 9: "Place Order",
  // 10: "Settle Funds",
  // 11: "Cancel Order",
  // 12: "Cancel Order By Client Id",
  // 13: "Change Borrow Limit",
  // 14: "Place And Settle",
  // 15: "Force Cancel Orders",
  // 16: "Partial Liquidate"
      
    }
  } catch (error) {
    reportError(error, {
      url: url,
      signature: signature,
    });
  }

  return (
    <InstructionCard
      ix={ix}
      index={index}
      result={result}
      title={`Mango Markets: ${title || "Unknown"}`}
      innerCards={innerCards}
      childIndex={childIndex}
      defaultRaw
    />
  );
}
