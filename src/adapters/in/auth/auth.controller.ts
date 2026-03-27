import {Controller, Get, Post, Req, Res, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Request, Response} from 'express';

@Controller('auth')
export class AuthController {
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req: Request) {
        // Redirects to Google
        console.log(' #### googleAuth');
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
        // Passport adds the user to req.user after successful authentication
        // Redirect to the frontend application's main page (e.g., http://localhost:3000)
        // where the user can see the list of tenants
        const user = req.user;
        console.log(' #### googleAuthRedirect => ', process.env.FRONTEND_URL, ' User: ', user ? (user as any).id : 'None');
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000/login';
        res.redirect(frontendUrl);
    }

    @Get('session')
    async session(@Req() req: Request) {
        if (req.isAuthenticated()) {
            return {authenticated: true, user: req.user};
        }
        return {authenticated: false};
    }

    @Get('logout')
    async logoutGet(@Req() req: Request, @Res() res: Response) {
        return this.handleLogout(req, res);
    }

    @Post('logout')
    async logoutPost(@Req() req: Request, @Res() res: Response) {
        return this.handleLogout(req, res);
    }

    private async handleLogout(req: Request, res: Response) {
        req.logout((err) => {
            if (err) {
                return res.status(500).json({message: 'Logout failed'});
            }
            res.status(200).json({message: 'Logged out'});
        });
    }
}
