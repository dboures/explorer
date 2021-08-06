import React from "react";
import { SignatureResult, TransactionInstruction } from "@solana/web3.js";
import { InstructionCard } from "../InstructionCard";
import { Address } from "components/common/Address";
import { WithdrawSerum } from "./types";

export function WithdrawSerumDetailsCard(props: {
  ix: TransactionInstruction;
  index: number;
  result: SignatureResult;
  info: WithdrawSerum;
  innerCards?: JSX.Element[];
  childIndex?: number;
}) {
  const { ix, index, result, info, innerCards, childIndex } = props;

  return (
    <InstructionCard
      ix={ix}
      index={index}
      result={result}
      title="Mango Markets: Withdraw Serum"
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
        <td>User's Mango Serum Account</td>
        <td className="text-lg-right">
          <Address pubkey={info.userMangoSerumAccount} alignRight link />
        </td>
      </tr>

      <tr>
        <td>Owner</td>
        <td className="text-lg-right">
          <Address pubkey={info.owner} alignRight link />
        </td>
      </tr>

      <tr>
        <td>Owner Serum Account</td>
        <td className="text-lg-right">
          <Address pubkey={info.userSerumAccount} alignRight link />
        </td>
      </tr>

      <tr>
        <td>Mango Serum Vault</td>
        <td className="text-lg-right">
          <Address pubkey={info.mangoSerumVault} alignRight link />
        </td>
      </tr>

      <tr>
        <td>Signer</td>
        <td className="text-lg-right">
          <Address pubkey={info.signer} alignRight link />
        </td>
      </tr>
      
    </InstructionCard>
  );
}