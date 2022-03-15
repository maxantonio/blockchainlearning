use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{Mint, Token, TokenAccount,self,SetAuthority},
};
use spl_token::instruction::AuthorityType;

declare_id!("FgdR6pHE2LHMzqSiKN4wBENfmMi2pGV8kqo8eetK92mz");

#[program]
pub mod token_minter {
    use super::*;

    pub fn airdrop(ctx: Context<Airdrop>, mint_bump: u8, amount: u64) -> ProgramResult {
        anchor_spl::token::mint_to(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                anchor_spl::token::MintTo {
                    mint: ctx.accounts.mint.to_account_info(),
                    to: ctx.accounts.destination.to_account_info(),
                    authority: ctx.accounts.mint.to_account_info(),
                },
                &[&[&"faucet-mint".as_bytes(), &[mint_bump]]],
            ),
            amount,
        )?;
        Ok(())
    }
    pub fn mintnft(ctx: Context<Mintnft>, mint_bump: u8, amount: u64) -> ProgramResult {
        // let inner = vec![
        //     b"state".as_ref(),
        //     ctx.accounts.user_sending.key.as_ref(),
        //     ctx.accounts.user_receiving.key.as_ref(),
        //     mint_of_token_being_sent_pk.as_ref(), 
        //     application_idx_bytes.as_ref(),
        //     bump_vector.as_ref(),
        // ];
        // let outer = vec![inner.as_slice()];
        anchor_spl::token::mint_to(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                anchor_spl::token::MintTo {
                    mint: ctx.accounts.mint.to_account_info(),
                    to: ctx.accounts.destination.to_account_info(),
                    authority: ctx.accounts.mint.to_account_info(),
                },
                &[&[&"nft-mint-2".as_bytes(), &[mint_bump]]],
            ),
            amount,
        )?;
        let cpi_accounts = SetAuthority {
            account_or_mint: ctx.accounts
                .mint
                .to_account_info()
                .clone(),
            current_authority: ctx.accounts.mint.to_account_info().clone(),
        };

        let cpi_program = ctx.accounts.token_program.clone();

        token::set_authority(
            CpiContext::new_with_signer(cpi_program.to_account_info(), cpi_accounts,
            &[&[&"nft-mint-2".as_bytes(), &[mint_bump]]],),
            AuthorityType::MintTokens,
            None
        )?;
        Ok(())
    }
    
}


#[derive(Accounts)]
#[instruction(mint_bump: u8, amount: u64)]
pub struct Airdrop<'info> {
    #[account(
        init_if_needed,
        payer = payer,
        seeds = [b"faucet-mint".as_ref()],
        bump = mint_bump,
        mint::decimals = 6,
        mint::authority = mint
    )]
    pub mint: Account<'info, Mint>,

    #[account(
        init_if_needed,
        payer = payer,
        associated_token::mint = mint,
        associated_token::authority = receiver
    )]
    pub destination: Account<'info, TokenAccount>,
    pub payer: Signer<'info>,
    pub receiver: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
#[instruction(mint_bump: u8, amount: u64)]
pub struct Mintnft<'info> {
    #[account(
        init_if_needed,
        payer = payer,
        seeds = [b"nft-mint-2".as_ref(),payer.key().as_ref()],
        bump = mint_bump,
        mint::decimals = 0,
        mint::authority = mint
    )]
    pub mint: Account<'info, Mint>,

    #[account(
        init_if_needed,
        payer = payer,
        associated_token::mint = mint,
        associated_token::authority = receiver
    )]
    pub destination: Account<'info, TokenAccount>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub receiver: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
}
