use anchor_lang::prelude::*;
use anchor_spl::token::{Token, TokenAccount, Transfer, transfer};

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod coin_flip {
    use super::*;

    pub fn flip_coin(ctx: Context<FlipCoin>, bet_amount: u64, user_guess: bool) -> Result<()> {
        let coin_result = generate_random_coin_flip();
        let is_winner = coin_result == user_guess;

        if is_winner {
            // Transfer winnings (minus admin fee)
            let admin_fee = bet_amount * 10 / 100; // 10% admin fee
            let user_winnings = bet_amount * 2 - admin_fee;

            transfer(
                CpiContext::new(
                    ctx.accounts.token_program.to_account_info(),
                    Transfer {
                        from: ctx.accounts.user_token_account.to_account_info(),
                        to: ctx.accounts.prize_pool.to_account_info(),
                        authority: ctx.accounts.user.to_account_info(),
                    }
                ),
                user_winnings
            )?;
        }

        Ok(())
    }

    fn generate_random_coin_flip() -> bool {
        // Simplified random generation (replace with proper randomness in production)
        Clock::get()?.unix_timestamp % 2 == 0
    }
}

#[derive(Accounts)]
pub struct FlipCoin<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub prize_pool: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}
