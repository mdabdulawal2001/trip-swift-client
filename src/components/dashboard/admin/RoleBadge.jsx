import { Ban, ShieldAlert, ShieldCheck, UserCheck, UserCog } from "lucide-react";

{
  /* Actions */
}
<div className="flex min-w-0 justify-center">
  {isCurrentUser ? (
    <span className="inline-flex h-9 shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold whitespace-nowrap text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
      <ShieldCheck className="h-4 w-4" />
      Current Account
    </span>
  ) : (
    <div className="flex shrink-0 items-center justify-start gap-1.5 whitespace-nowrap">
      {/* Make Vendor / Make User */}
      <RoleActionButton
        icon={<UserCog className="h-3.5 w-3.5" />}
        label={user.role === "user" ? "Make Vendor" : "Make User"}
        onClick={() =>
          handleRoleChange(user, user.role === "user" ? "vendor" : "user")
        }
        disabled={isUpdating}
        variant={user.role === "user" ? "vendor" : "user"}
      />

      {/* Make Admin / Make Vendor */}
      <RoleActionButton
        icon={<ShieldCheck className="h-3.5 w-3.5" />}
        label={user.role === "admin" ? "Make Vendor" : "Make Admin"}
        onClick={() =>
          handleRoleChange(user, user.role === "admin" ? "vendor" : "admin")
        }
        disabled={isUpdating}
        variant={user.role === "admin" ? "vendor" : "admin"}
      />

      {/* Block / Unblock */}
      <button
        type="button"
        disabled={isUpdating}
        onClick={() => handleStatusChange(user)}
        className={`
          inline-flex h-9 shrink-0 items-center justify-center gap-1
          rounded-xl border px-2 text-[10px] font-bold whitespace-nowrap
          transition-all duration-200
          disabled:cursor-not-allowed disabled:opacity-50
          ${
            user.banned
              ? `
                border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100
                dark:border-emerald-900/40 dark:bg-emerald-500/10 dark:text-emerald-400
              `
              : `
                border-red-200 bg-white text-red-500 hover:bg-red-50
                dark:border-red-900/40 dark:bg-slate-900! dark:text-red-400
              `
          }
        `}
      >
        {user.banned ? (
          <>
            <UserCheck className="h-3.5 w-3.5" />
            Unblock
          </>
        ) : (
          <>
            <Ban className="h-3.5 w-3.5" />
            Block
          </>
        )}
      </button>

      {/* Fraud */}
      {user.role === "vendor" && (
        <button
          type="button"
          disabled={isUpdating}
          onClick={() => handleFraudChange(user)}
          className={`
            inline-flex h-9 shrink-0 items-center justify-center gap-1
            rounded-xl border px-2 text-[10px] font-bold whitespace-nowrap
            transition-all duration-200
            disabled:cursor-not-allowed disabled:opacity-50
            ${
              user.isFraud
                ? `
                  border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100
                  dark:border-emerald-900/40 dark:bg-emerald-500/10 dark:text-emerald-400
                `
                : `
                  border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-100
                  dark:border-orange-900/40 dark:bg-orange-500/10 dark:text-orange-400
                `
            }
          `}
        >
          {user.isFraud ? (
            <>
              <ShieldCheck className="h-3.5 w-3.5" />
              Un-fraud
            </>
          ) : (
            <>
              <ShieldAlert className="h-3.5 w-3.5" />
              Mark Fraud
            </>
          )}
        </button>
      )}
    </div>
  )}
</div>;
