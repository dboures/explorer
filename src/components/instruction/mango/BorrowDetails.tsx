import React from "react";
import { SignatureResult, TransactionInstruction } from "@solana/web3.js";
import { InstructionCard } from "../InstructionCard";
import { Address } from "components/common/Address";
import { Borrow } from "./types";

export function BorrowDetailsCard(props: {
  ix: TransactionInstruction;
  index: number;
  result: SignatureResult;
  info: Borrow;
  innerCards?: JSX.Element[];
  childIndex?: number;
}) {
  const { ix, index, result, info, innerCards, childIndex } = props;

  return (
    <InstructionCard
      ix={ix}
      index={index}
      result={result}
      title="Mango Markets: Borrow"
      innerCards={innerCards}
      childIndex={childIndex}
    >
      <tr>
        <td>Program</td>
        <td className="text-lg-right">
          <Address pubkey={info.programId} alignRight link />
        </td>
      </tr>

      <tr>
        <td>Mango Group</td>
        <td className="text-lg-right">
          <Address pubkey={info.mangoGroup} alignRight link />
        </td>
      </tr>

      <tr>
        <td>Margin Account</td>
        <td className="text-lg-right">
          <Address pubkey={info.marginAccount} alignRight link />
        </td>
      </tr>

      <tr>
        <td>Owner</td>
        <td className="text-lg-right">
          <Address pubkey={info.owner} alignRight link />
        </td>
      </tr>

      <tr>
        <td>Open Orders Accounts</td>
        <td className="text-lg-right">
          {info.openOrdersAccounts.map((account, index) => {
            return <Address pubkey={account} key={index} alignRight link />;
          })}
        </td>
      </tr>

      <tr>
        <td>Oracle Accounts</td>
        <td className="text-lg-right">
          {info.oracles.map((account, index) => {
            return <Address pubkey={account} key={index} alignRight link />;
          })}
        </td>
      </tr>
    </InstructionCard>
  );
}